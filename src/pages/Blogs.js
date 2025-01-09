import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

const Blogs = () => {
    const [blogPostList, setBlogPostList] = useState([])
    const [show, setShow] = useState(false);
    const [deleteBlogId, setDeleteBlogId] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        blogList()
    }, [])
    const blogList = async () => {
        await fetch('https://677f835f0476123f76a6ceca.mockapi.io/api/posts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                setBlogPostList(res)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }

    const onDelete = (id)=>{
        handleShow();
        setDeleteBlogId(id);
    }

    const deleteBlog = async (id) => {
        console.log("id res:",id);
        await fetch(`https://677f835f0476123f76a6ceca.mockapi.io/api/posts/:${id.toString}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                setBlogPostList(res)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }
    return (
        <div >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {blogPostList?.map((item) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Button variant="primary" size="sm">Edit</Button>
                                    <Button onClick={()=>onDelete(item.id)} size="sm" variant="danger">Delete</Button></td>
                            </tr>)
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>deleteBlog(deleteBlogId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Blogs