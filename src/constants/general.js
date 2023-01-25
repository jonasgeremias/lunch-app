export const DRAWER_WIDTH = 200;

export const LOTTIE_OPTIONS = animation => ({
   loop: true,
   autoplay: true,
   rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
   },
   animationData: animation,
})



// @@ Para monstar o bacno de dados
const USER_INITIAL_DATA = {
   uid: '',
   status: 'active',
   userType: 'client',
   createdAt: "",
   updatedAt: "",
   approved: false
}

// @@ Para monstar o bacno de dados
const REGISTER_USER_INITIAL_DATA = {
   uid: null,
   email: '',
   emailVerified: false,
   isAnonymous: false,
   uid: '',
   phoneNumber: null,
   photoURL: null,
   metadata: {
      createdAt: "1674097887444",
      creationTime: "Thu, 19 Jan 2023 03:11:27 GMT",
      lastLoginAt: "1674623270442",
      lastSignInTime: "Wed, 25 Jan 2023 05:07:50 GMT",
   }
}