const express = require("express");
const projectModel = require("../helpers/projectModel.js")

const router = express.Router();

//Create

router.post("/", (req, res) => {
    const projectInfo =req.body;
    projectModel
    .insert(projectInfo)
    .then((project) => {
        res.status(201).json([{message: "Your project was created!"}, project])
    })

})

//Read
router.get("/", (req,res) => {
    projectModel
    .get(req.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch (error => {
    console.log(error);
    res.status(500).json({message: "Error retrieving project!"})
})
})

router.get("/:id", (req,res) => {
    projectModel
    .get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch (error => {
    console.log(error);
    res.status(500).json({message: "Error retrieving project!"})
})
})

//Update

router.put("/:id", (req, res) => {
    const projectInfo =req.body;
    const  { id } = req.params
    projectModel
    .update(id, projectInfo)
    .then(project => {
        if (project) {
            res.status(200).json([{message: "The project has been updated!"}, project])
            //include as an array so that the show will populate like the message
        } else {
            res.status(404).json({message: "The project could not be updated, it was not found"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "There was an error updating the project"})
    })
})

// Delete 

router.delete("/:id", (req, res) => {
    projectModel
    .remove(req.params.id)
    .then(project => {
        if(project > 0) {
            res.status(200).json([{message: "The selected project has been deleted"}, project])
        } else { res.status(404).json({message: "The project could not be found"})}
    })
    .catch(error => {
        console.log (error);
        res.status(500).json({message: "Error deleting the selected project"})
    })
})

//get show's characters

router.get("/:id/action", (req, res) => {
    projectModel
    .getProjectActions(req.params.id)
    .then (e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving actions for this project"})
    })
})

module.exports = router;