import axios from 'axios'

export const checkUserPresent = async (formUsername) => {
    try {
        const { data, status } = await axios.get("/api/users")
        if (status === 200 || status === 201) {
            return data.users.some(user => user.username === formUsername)
        }
    } catch (err) {
        console.error(err)
        return ''
    }
}