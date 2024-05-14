import User from '../models/user.js'; // Import the User model

// Controller function to update user by email
export const updateByEmail = async (email, updateData) => {
    try {
        console.log(email);
        const updatedUser = await User.findOneAndUpdate(
            { email: email }, // Find user by email
            updateData, // Data to update
            { new: true } // Return updated document
        );
        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user by email: ${error}`);
    }
};


export const getByEmail = async (email) => {
    try {

        const user = await User.findOne({ email: email }).exec(); // Add .exec() to actually execute the query
        if (!user) {
            throw new Error('User not found'); // Throw an error if user is not found
        }
        return user;
    } catch (error) {
        console.error(`Error getting user by email: ${error}`);
        //   throw error; // Rethrow the error to propagate it to the caller
    }
};

