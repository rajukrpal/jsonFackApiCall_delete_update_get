import axios from "axios";

export const getData = async() =>{
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/',{
            headers: {
                "Content-Type": "application/json",
            }
        })
        const getData = await response.data;
        return getData;
    } catch (error) {
        console.log(error)
    }
}


export const deleteData = async (id) => {
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            return { success: true, message: "Data deleted successfully!" };
        } else {
            return { success: false, message: `Failed to delete data. Status code: ${response.status}` };
        }
    } catch (error) {
        return { success: false, message: `Error deleting data: ${error.message}` };
    }
};



export const editData = async (user) => {
    try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${user.id}`, user, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            return { success: true, data: response.data, message: "Data updated successfully!" };
        } else {
            return { success: false, message: `Failed to update data. Status code: ${response.status}` };
        }
    } catch (error) {
        return { success: false, message: `Error updating data: ${error.message}` };
    }
};



