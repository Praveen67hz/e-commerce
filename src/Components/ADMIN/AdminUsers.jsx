import { useEffect,useState } from 'react';
import './AdminUsers.css';
import axios from "../../API/axios";

const AdminUsers = () => {

    const[users,setUsers] = useState([]);
    const[editingUser,setEditingUser] = useState(null);
    const[editFormData , setEditFormData] = useState({
        name:"",
        email:"",
        role:""
    });

    useEffect(()=>{
        loadUsers();
    },[]);  

    const loadUsers = async() =>{
         try{
            const response = await axios.get("/api/auth/user");
            const userwithRole = response.data.map(user => ({
                  ...user,
                  role: user.isAdmin?  "admin" : "user",
            }));
            setUsers(userwithRole);
         }
         catch(err){
            console.log("failed to fetch user",err);
         }
    };

    const handleEditClick = (user) =>{
          setEditingUser(user.email);
          setEditFormData({
            name : user.name,
            email: user.email,
            role: user.role
          });
    };

    const handleEditFormChange =(e)=>{
         const {name,value} = e.target;
         setEditFormData({
          ...editFormData,[name]:value
         });
    };

   const handleEditFormSubmit = (e)=>{
      e.preventDefault();

      const  updatedUsers = users.map(user=>{
        if(user.email === editingUser)
        {
          return{...user, ...editFormData};
        }
        return user;
      });

      localStorage.setItem('users' , JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setEditingUser(null);
   };

    const handleCancelClick = () => {
        setEditingUser(null);
    };

    const handleDeleteClick =(userEmail)=>{
      if(window.confirm("Are you sure want to delete this user?"))
      {
        const updatedUsers = users.filter(user=>user.email !== userEmail);

        localStorage.setItem("users",JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
      }
    };


  return (
    <div className='admin-users-container'>
      <h1>All Users</h1>
      <table className='users-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user=>(
            <tr key ={user.email}>
              {editingUser === user.email ? (
                <td colSpan = "4">
                  <form onSubmit = {handleEditFormSubmit} className='edit-form'>
                    
                    <input 
                      type ="text"
                      name = "name"
                      value = {editFormData.name}
                      onChange={handleEditFormChange}
                      required
                     />

                      <input 
                      type ="email"
                      name = "email"
                      value = {editFormData.email}
                      onChange={handleEditFormChange}
                      required
                     />

                     <select 
                      type ="role"
                      name = "role"
                      value = {editFormData.role}
                      onChange={handleEditFormChange}
                      required
                     >
                         <option value="user">User</option>
                         <option value="admin">Admin</option>

                    </select>

                  <div className='form-actions'>
                      <button type = "submit">Save</button>
                      <button type = "button" onClick={handleCancelClick}>
                       Cancel
                      </button>
                    </div>
                  </form>
                </td>
              ):(

                <>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick = {()=> handleEditClick(user)}>Edit</button>
                <button onClick={()=>handleDeleteClick(user.email)}
                  className='delete-btn'>
                  Delete
                </button>
              </td>
              </>
                )}
              </tr>
          ))}
      </tbody>

      </table>
    </div>
  );
};

export default AdminUsers
