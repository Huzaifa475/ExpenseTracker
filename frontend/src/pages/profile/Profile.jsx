import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './styles.css'
import axios from 'axios'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import { useDispatch} from 'react-redux'
import { resetIncomeState } from '../../redux/incomeSlice.js'
import { resetExpenseState } from '../../redux/expenseSlice.js'

const StyledIcon = styled(FontAwesomeIcon)`
    width: 80%;
    height: 20%;
`

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [avatar, setAvatar] = useState(null)
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // const res = await axios.get('https://expense-tracker-blue-pi.vercel.app/api/v1/users/getuser')
                const res = await axios({
                   method: 'get',
                   url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/users/getuser',
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                  },
                })
                setUsername(res.data?.data?.username)
                setEmail(res.data?.data?.email)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser()
    }, [setUsername, setEmail])

    const logoutHandle = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.post('https://expense-tracker-blue-pi.vercel.app/api/v1/users/logout')
            const res = await axios({
                method: 'post',
                url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/users/logout',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Include JWT token here
                },
            })
            console.log(res);
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
        finally {
            localStorage.removeItem('accessToken'); // Remove token from localStorage
            dispatch(resetIncomeState()); // Reset income state
            dispatch(resetExpenseState()); // Reset expense state
          }
    }

    const handleFileSelect = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const uploadImage = async (e) => {
        e.preventDefault();
        try {
            if (!selectedFile) {
                throw new Error('Please select a file');
            }
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            const response = await fetch('https://expense-tracker-blue-pi.vercel.app/api/v1/users/uploadavatar', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Include JWT token here
                },
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const responseData = await response.json();
            console.log('Image uploaded successfully:', responseData);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/users/getuser',
                    headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${accessToken}`,
                   },
                 })
                setAvatar(res.data?.data?.avatar)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser()
    }, [setAvatar, uploadImage])
    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-main-container">
                    <div className="avatar">
                        {
                            avatar ?
                                <img src={avatar} alt="" />
                                :
                                <>
                                    <StyledIcon icon={faUser} />
                                    <div className="upload">
                                        <form className="upload" onSubmit={uploadImage}>
                                            <input type="file" name="uploadFile" accept="image/*" onChange={handleFileSelect} required />
                                            <br /><br />
                                            {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                                            <button type="submit">Upload Image</button>
                                        </form>
                                    </div>
                                </>
                        }
                    </div>
                    <div className="profile-main-content">
                        <div className="profile-username">
                            <h1>Username: <span>{username}</span></h1>
                        </div>
                        <div className="profile-email">
                            <h1>Email: <span>{email}</span></h1>
                        </div>
                        <div className="logout-button">
                            <button onClick={logoutHandle}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
