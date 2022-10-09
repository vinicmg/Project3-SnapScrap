import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { v4 as uuidv4 } from "uuid";

export function FollowersPage() {
    const [user, setUser] = useState({
        name: '',
        userName: '',
        email: '',
        profilePicture: '',
        collections: [],
        followers: [],
        following: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);
            var response = null;
            if (userId) {
                response = await api.get(`/users/user/${userId}`)
            } else {
                response = await api.get('/users/profile')
            }
            setUser(response.data)
            setIsLoading(false)
        }

        fetchUser();
    }, [])

    return (
        <div>
            {
                user.followers.map((follower) => {
                    console.log(follower)
                    return (
                        <div key={uuidv4()}>
                            <img src={follower.profilePicture} width={50}/>
                            <p>Email: {follower.email}</p>
                        </div>                        
                    )
                })
            }
        </div>
    );
}

export default FollowersPage;