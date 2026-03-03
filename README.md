# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Project Changes Summary (Frontend)

This section summarizes the UI/feature changes implemented during this collaboration and where they live in the codebase.

### 1) Follow/Followers State + Discover Integration
What changed:
- Added a follow context and reducer to manage followers/following state.
- Discover page now pulls followers/following and renders “Who to Follow” + “Friends”.
- Clicking the message icon in Discover navigates to Message and opens the chat with that user.

Files:
- `src/contexts/follow/FollowProvider.js`
- `src/contexts/follow/followReducer.js`
- `src/components/Discover.js`
- `src/index.js` (provider wiring)
- `src/components/message/Message.js` (accepts preselected contact)

Notes:
- The follow provider is flexible for response shapes (e.g., `data.following`, `data.users`, `data.user.following`).

### 2) Messaging UI Enhancements
What changed:
- Polished chat UI layout and spacing.
- Auto-focus and scroll to bottom on contact selection.
- De-dup contacts in the sidebar by user id.

Files:
- `src/components/message/Message.js`
- `src/components/message/message.css` (scrollbar hiding)

### 3) Infinite Scroll Dedupe for Feed
What changed:
- Prevented duplicate posts when loading more pages by deduping on `_id`.

Files:
- `src/contexts/posts/PostProvider.js`

### 4) User Profile Page (View Other Users)
What changed:
- New `/profile/:userId` page showing user info, followers, following, and posts.
- Layout inspired by the provided reference, with a tab row for Posts/Followers/Following.
- Posts reuse the same card format as Feed.
- Clickable avatar/username navigates to that user profile.

Files:
- `src/components/Profile/UserProfilePage.js`
- `src/App.js`
- `src/components/Post.js`
- `src/components/singlePost.js`

### 5) Layout & Scroll Behavior
What changed:
- Sidebar and Discover are fixed; only middle content scrolls.
- Scrollbar hidden on the middle content panel.

Files:
- `src/pages/Layout.js`
- `src/index.css`

### 6) Post Card Layout Tweaks
What changed:
- Time is aligned inline with username/handle.
- Comment count now uses `commentsCount` (from feed API) with fallbacks.

Files:
- `src/components/Post.js`

### 7) Threaded Comments (Unlimited Depth)
What changed:
- Built nested comment tree and rendered replies recursively.
- Replies are hidden until “View replies (n)” is clicked.
- Top-level comment count doesn’t include replies.
- Added reply input for commenting on comments.

Files:
- `src/components/singlePost.js`
- `src/components/CommentCard.js`
- `src/components/CommentBox.js`

### 8) Navbar Title Cleanup
What changed:
- IDs in the URL no longer show in the header.
- Single post route now shows “Post” in the header.

Files:
- `src/components/Navbar.js`

## Backend Change (Required for Comment Counts)
Your feed API was updated to return `commentsCount` for each post. The frontend reads this field.

Expected field:
- `commentsCount` on each post from `GET /api/posts`
