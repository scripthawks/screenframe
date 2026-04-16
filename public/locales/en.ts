export const en = {
  auth: {
    agree: 'I agree to the',
    alreadyConfirmedEmail: 'Your email is already confirmed',
    and: 'and',
    authErrors: {
      email: {
        incorrect: 'The email must match the format example@example.com',
        nonEmpty: 'Enter email'
      },
      password: {
        digit: 'Minimum 1 digit (0-9)',
        lowerCase: 'Minimum 1 lowercase letter (a-z)',
        max: 'Maximum number of characters 20',
        min: 'Minimum number of characters 6',
        nonEmpty: 'Enter password',
        regex: `Password must contain A-z, 0-9, !"#$%&'()*+,-./:;<=>?@[\\]^_{|}~`,
        specialChar: 'Minimum 1 special character (! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~)',
        upperCase: 'Minimum 1 uppercase letter (A-Z)',
      },
      passwordConfirmation: 'Confirm your password',
      recaptcha: {
        expired: 'Verification expired. Check the checkbox again',
        nonEmpty: 'Please verify that you are not a robot'
      },
      refine: 'Passwords must match',
      terms: 'Please, review and agree to the Terms of service and Privacy policy to proceed',
      username: {
        max: 'Maximum number of characters 30',
        min: 'Minimum number of characters 6',
        nonEmpty: 'Enter username',
        regex: 'Username can contain only A-z, - или _',
      },
    },
    backToSignIn: 'Back to Sign In',
    backToSignUp: 'Back to Sign Up',
    codeIncorrect: 'Code is incorrect',
    confirmedEmail: 'Your email has been confirmed',
    congratulations: 'Congratulations!',
    createNewPassword: 'Create New Password',
    dontHaveAccount: 'Don’t have an account?',
    email: 'Email',
    emailAlreadyExist: 'User with this email is already registered',
    emailConfirm(email: string) {
      return `We have sent a link to confirm your email to ${email}`
    },
    emailNotSent: 'Email not sent',
    emailSent: 'Email sent',
    enterEmail: 'Enter your email address and we will send you further instructions',
    failedToSentEmail: 'Failed to send email. Please try again later.',
    forgotPassword: 'Forgot Password',
    goToSignIn: 'Go to Sign In',
    haveAccount: 'Do you have an account?',
    incorrectInputData: 'Incorrect input data',
    linkHasBeenSent: 'The link has been sent by email. If you don’t receive an email send link again',
    logIn: 'Log in',
    newPassword: 'New password',
    password: 'Password',
    passwordChanged: 'Your password was successfully changed',
    passwordCharacters: 'Your password must be between 6 and 20 characters',
    passwordConfirmation: 'Password Confirmation',
    policy: 'Privacy Policy',
    policyTitle: 'Privacy Policy',
    privacyAndTerms: {
      privacyText: `**Last updated: February 13, 2026\n
      INCTAGRAM values your privacy. This policy explains how we collect, use, and protect information when you use https://screenframe.ru. By using our service, you agree to this policy.

**Information we collect:\n
We gather device details like IP address, browser type, screen resolution, and usage data (pages visited, time spent). When you create an account, we collect username, email, phone number, profile picture, posts, comments, likes, and direct messages.

**How we use your data:\n
Device data helps us improve performance, prevent spam, and analyze trends. Account data enables posting, following users, messaging, notifications, content recommendations, and account recovery. We only collect what's essential for core functionality.

**Sharing your data:\n
We don't sell personal information. Data may be shared with hosting providers, analytics services, or law enforcement when legally required. No third-party advertising partners receive your data.

**Your privacy controls:\n
EU residents can request data access, correction, deletion, processing restrictions, or portability. All users can delete their account (data removed within 30 days), adjust privacy settings, or download their content.

**Cookies and tracking:\n
Essential cookies handle authentication and preferences. Analytics cookies track usage patterns (anonymized). Disable cookies in your browser settings.

**Data transfers:\n
Information may be processed in data centers outside your country for operational needs.

**Security measures\n
We implement encryption, access controls, and regular audits, but no online service offers absolute security.

**Contact us: scripthawks@gmail.com`,
      termsText: `**Effective: February 13, 2026\n
INCTAGRAM provides photo and video sharing services to connect you with friends and discover content. By using https://screenframe.ru, you agree to these Terms.

**What we provide:\n
• Content creation, posting, and discovery tools\n
• Messaging and direct communication features\n
• User profiles, followers, and social networking
• Security and spam protection systems
• Regular service updates and improvements

**Your commitments:\n
To use INCTAGRAM, you must:
• Be at least 13 years old
• Not be legally prohibited from using the service
• Not have had prior accounts suspended for violations
• Follow all applicable laws

**Prohibited activities:\n
You agree not to:
• Create fake accounts or impersonate others
• Post illegal, harmful, or copyrighted content
• Spam, harass, or disrupt other users
• Attempt to hack or interfere with service operation
• Sell accounts, data, or access to features
• Violate privacy or intellectual property rights

**Content license:\n
You retain ownership of your posts but grant INCTAGRAM a worldwide license to host, display, and distribute your content across our service and partners.

**User permissions:\n
We may use your username, profile photo, and activity data for service functionality, recommendations, and notifications. You authorize automatic service updates.

**Termination:\n
We may suspend or delete accounts violating these Terms without notice.

**Contact: scripthawks@gmail.com`,
    },
    resendLink: 'Resend link',
    resendVerificationLink: 'Resend verification link',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    terms: 'Terms of Service',
    termsTitle: 'Terms of Service',
    username: 'Username',
    usernameAlreadyExist: 'User with this username is already registered',
    verificationLink: 'Email verification link expired',
    verificationLinkExpired: 'Looks like the verification link has expired. Not to worry, we can send the link again',
    wereSorry: 'We\'re sorry'
  },
  locale: {
    english: 'Английский',
    language: 'Language',
    russian: 'Русский',
  },
  modal: {
    follow: 'Follow',
    no: 'No',
    ok: 'OK',
    save: 'Save',
    unfollow: 'Unfollow',
    yes: 'Yes',
  },
  profile: {
    logoutConfirm(email: string) {
      return `Are you really want to log out of your account ${email}?`
    }
  },
  sidebar: {
    logout: 'Log Out',
  }
}