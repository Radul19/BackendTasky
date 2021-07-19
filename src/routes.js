const { Router } = require('express')
const express = require('express')
const router = Router()

const { getTask,getUser ,getDashboard,saveTask,deleteTask,updateTask,registerUser, completeTask,getUserData,pinTask, searchTasks, home} = require('./controller')

router.get('/',home)

router.get('/userdata/:id', getUserData)

router.post('/user', getUser)

router.get('/:id/dashboard', getDashboard)

router.get('/task/:id', getTask)

router.post('/task', saveTask)

router.delete('/task/:id', deleteTask)

router.put('/task/:id', updateTask)

router.post('/register',registerUser)

router.post('/completeTask',completeTask)

router.put('/pintask',pinTask)

router.get('/searchingtask/:id/:title',searchTasks)

// app.post('/task/image',loadImage)
// router.post('/task/image',loadImage)
// router.get('/getimage/:name',getImage)

module.exports = router