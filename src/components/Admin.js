import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
import { auth, db } from "../services/firebase";

const Admin = () => {
//   const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [active, setActive] = useState(true);
  const [role, setRole] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot(snapshot => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleCreateUser = async () => {
    if (editingUser) {
      await db.collection("users").doc(editingUser).update({
        email,
        password,
        displayName,
        photoURL,
        active,
        role
      });
    } else {
      await db.collection("users").add({
        email,
        password,
        displayName,
        photoURL,
        active,
        role
      });
    }
    setShowModal(false);
    resetForm();
  };

  const handleEditUser = async userId => {
    setShowModal(true);
    const user = users.find(user => user.id === userId);
    setEditingUser(userId);
    setEmail(user.data.email);
    setPassword(user.data.password);
    setDisplayName(user.data.displayName);
    setPhotoURL(user.data.photoURL);
    setActive(user.data.active);
    setRole(user.data.role);
  };

  const handleDeleteUser = async userId => {
    await db.collection("users").doc(userId).delete();
  };

  const resetForm = () => {
    setEditingUser(null);
    setEmail("");
    setPassword("");
    setDisplayName("");
    setPhotoURL("");
    setActive(true);
    setRole([]);
  };

  return (
    <>
      <h2>Admin Panel</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Display Name</th>
            <th>Photo URL</th>
            <th>Active</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.data.email}</td>
              <td>{user.data.displayName}</td>
              <td>{user.data.photoURL}</td>
              <td>{user.data.active ? "Yes" : "No"}</td>
              <td>{user.data.role.join(", ")}</td>
              <td>
                <Button variant="info" onClick={() => handleEditUser(user.id)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={() => setShowModal(true)}>Create User</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create/Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="displayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="photoURL">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                value={photoURL}
                onChange={e => setPhotoURL(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="active">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={active}
                onChange={e => setActive(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={role}
                onChange={e => {
                  const options = e.target.options;
                  const value = [];
                  for (let i = 0, l = options.length; i < l; i++) {
                    if (options[i].selected) {
                      value.push(options[i].value);
                    }
                  }
                  setRole(value);
                }}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="tech">Tech</option>
                <option value="lead">Lead</option>
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
                <option value="sales">Sales</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Admin;

