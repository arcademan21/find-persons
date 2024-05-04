import * as admin from 'firebase-admin'
import FirebaseConfig from '@/configs/FirebaseConfig'


const DeleteAllUsers = async ( nextPageToken ) => {

    admin.initializeApp(FirebaseConfig)

    const deleteAllUsers = async ( nextPageToken ) => {
        try {
            const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
            listUsersResult.users.forEach(async (userRecord) => {
                await admin.auth().deleteUser(userRecord.uid)
            })
            if (listUsersResult.pageToken) {
                deleteAllUsers(listUsersResult.pageToken)
            }
        } catch (error) {
            console.log('Error listing users:', error)
        }
    }

    return (<>
        <h1>Deleting all users</h1>
        <button onClick={deleteAllUsers} className='btn btn-danger'
        >Delete all users</button>
    </>)

}

export default DeleteAllUsers

