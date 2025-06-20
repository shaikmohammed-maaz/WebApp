import { getFirestore, doc, getDoc, setDoc ,updateDoc ,arrayUnion ,query ,collection,where, getDocs ,documentId } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

async function createUserIfNotExists(user , referralCodeInput = null ,displayName = null) {
  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    const now = new Date().toISOString();
    
    const referralCode = generateReferralCode(user.displayName || "user", user.uid);

    await setDoc(userDocRef, {
      userId: user.uid,
      email: user.email || null,
      username: user.displayName || displayName,
      phone: user.phoneNumber || "",
      passwordHash: null, // Google users don't use your app's password
      profilePicture: user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      referralCode: referralCode,
      referredBy: null,
      wallet: {
        walletAddress: "",
        balance: 0,
        transactions: []
      },
      mining: {
        totalMined: 0,
        currentSession: null,
        streak: {
          daysActive: 0,
          lastActiveDate: null
        },
        groupMining: null
      },
      achievements: {
        level: 1,
        badges: [],
        rank: null,
        dailyChallengesCompleted: 0
      },
      security: {
        twoFactorEnabled: false,
        lastLoginIP: null,
        deviceId: null,
        location: null
      },
      kyc: {
        status: "not_started",
        fullName: user.displayName || null,
        dob: null,
        idType: null,
        idNumber: null,
        documentImage: null,
        selfieImage: null,
        verifiedAt: null
      },
      preferences: {
        language: "en",
        darkMode: false,
        notificationsEnabled: true
      },
      accountStatus: {
        createdAt: now,
        lastActive: now,
        isBanned: false,
        banReason: null
      }
    });

    console.log("New user document created with referral code:", referralCodeInput);

    await addReferredUser(referralCodeInput, user.uid);

    console.log("New user document created.");
  } else {
    console.log("User already exists.");
  }
}

async function updateLastActive(userId) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    "accountStatus.lastActive": new Date().toISOString()
  });
}


async function updateWallet(userId, amount, type = "deposit") {
  const userRef = doc(db, "users", userId);
  const tx = {
    txId: crypto.randomUUID(), // or use another ID generator
    type,
    amount,
    status: "confirmed",
    timestamp: new Date().toISOString()
  };

  const userSnap = await getDoc(userRef);
  const balance = userSnap.data().wallet.balance || 0;
  const newBalance = type === "deposit" ? balance + amount : balance - amount;

  await updateDoc(userRef, {
    "wallet.balance": newBalance,
    "wallet.transactions": arrayUnion(tx)
  });
}


async function logMiningSession(userId, coinsEarned, duration) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const totalMined = userSnap.data().mining.totalMined || 0;

  await updateDoc(userRef, {
    "mining.totalMined": totalMined + coinsEarned,
    "mining.currentSession": {
      startTime: new Date().toISOString(),
      durationInMinutes: duration,
      coinsEarned
    },
    "mining.streak.lastActiveDate": new Date().toISOString(),
    "mining.streak.daysActive": (userSnap.data().mining.streak?.daysActive || 0) + 1
  });
}

async function updateSecurityMetadata(userId, ip, deviceId, location) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    "security.lastLoginIP": ip,
    "security.deviceId": deviceId,
    "security.location": location
  });
}

function generateReferralCode(username, uid) {
  // Example: first 3 letters of username + last 5 chars of UID + random 2 digits
  const base = (username || "user").substring(0,3).toUpperCase();
  const unique = uid.slice(-5).toUpperCase();
  const rand = Math.floor(Math.random() * 90 + 10); // 2 digits
  return `${base}${unique}${rand}`;
}


 async function addReferredUser(referralCode, newUserId) {
  // 1. Find the referrer by referral code
  const q = query(collection(db, "users"), where("referralCode", "==", referralCode));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Referral code not found");
  }

  // Assuming referral codes are unique, get the first matching user
  const referrerDoc = querySnapshot.docs[0];
  const referrerId = referrerDoc.id;

  // 2. Update the referrer's referredUsers array
  await updateDoc(doc(db, "users", referrerId), {
    referredUsers: arrayUnion(newUserId)
  });

  // 3. (Optional) Update the new user to record who referred them
  await updateDoc(doc(db, "users", newUserId), {
    referredBy: referralCode
  });

}

// Helper to batch Firestore queries (10 IDs per batch)
async function fetchUsersByIds(userIds) {
  const db = getFirestore();
  const chunkSize = 10;
  let allUsers = [];

  for (let i = 0; i < userIds.length; i += chunkSize) {
    const chunk = userIds.slice(i, i + chunkSize);
    const q = query(collection(db, "users"), where(documentId(), "in", chunk));
    const querySnap = await getDocs(q);
    querySnap.forEach(doc => {
      allUsers.push({ id: doc.id, ...doc.data() });
    });
  }
  return allUsers;
}

 async function fetchHomePageDataWithGroupProfiles() {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  // Fetch current user's document
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error("User document not found");
  const data = userSnap.data();

  console.log("Fetched user data:", data);

  // Extract group member IDs (assuming you store them as an array)
  const groupMemberIds = data.referredUsers || [];

   console.log("Group member IDs:", groupMemberIds);
  // Fetch group member profiles
  let groupMembers = [];
  if (groupMemberIds.length > 0) {
    const profiles = await fetchUsersByIds(groupMemberIds);
    groupMembers = profiles.map(member => ({
      userId: member.userId,
      userName: member.username || "",
      profilePicture: member.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      isMining: !!member.mining?.currentSession, // or whatever field indicates mining status
      // Optionally: add more fields as needed
    }));

    console.log("Fetched group members:", groupMembers);
  }

  // Prepare user and group mining data
  const userProfile = {
    userName: data.username || "",
    coins: data.wallet?.balance ?? 0,
    streak: data.mining?.streak?.daysActive ?? 0,
    target: data.mining?.currentSession?.startTime ?? null,
    mining: {
      currentSession: data.mining?.currentSession ?? null,
      totalMined: data.mining?.totalMined ?? 0,
    }
  };

  const groupMining = {
    groupName: data.mining?.groupMining?.groupName ?? null,
    groupMembersCount: groupMemberIds.length,
    groupBoost: data.mining?.groupMining?.boostPercent ?? 0,
    groupMembersList: groupMembers // Array of member profiles
  };

  return { userProfile, groupMining };
}


 async function completeMiningSession({
  userId,
  minedAmount,
  nextMiningTime,
  newStreak,
  totalMined
}) {
  // Prepare the new mining transaction
  const newMiningTx = {
    txId: `mining_${Date.now()}`,
    type: "mining",
    amount: minedAmount,
    status: "confirmed",
    timestamp: new Date().toISOString()
  };

  // Prepare update data
  const updateData = {
    "wallet.balance": minedAmount, // You may want to fetch and add, or pass the new balance directly
    "mining.currentSession": null, // Mining session ended
    "mining.streak.daysActive": newStreak,
    "mining.streak.lastActiveDate": new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    "mining.totalMined": totalMined,
    "mining.nextMiningTime": nextMiningTime, // Save cooldown/target timestamp
    "mining.transactions": arrayUnion(newMiningTx)
  };

  // Update Firestore
  await updateDoc(doc(db, "users", userId), updateData);
}



export {createUserIfNotExists, updateLastActive, updateWallet, logMiningSession, updateSecurityMetadata, generateReferralCode , fetchHomePageDataWithGroupProfiles , completeMiningSession};