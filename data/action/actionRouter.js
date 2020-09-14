const express = require("express");
const actionModel = require("../helpers/actionModel.js")

const router = express.Router();

//Create

router.post("/", (req, res) => {
    const actionInfo = req.body;
    actionModel
    .insert(actionInfo)
    .then((action) => {
        res.status(201).json([{message: "The action was created successfully!", action}])
    })
    .catch (error => {
        res.status(500).json({error, error: "There was an error creating the new action"})
    })
})

//Read
router.get("/", (req, res) => {
    actionModel
    .get(req.id)
    .then(e => {
        res.status(200).json(e)
    })
    .catch (error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving action!"})
    })
})
router.get("/:id", (req, res) => {
    actionModel
    .get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch (error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving action!"})
    })
})

//Update

router.put("/:id", (req, res) => {
    const actionInfo = req.body;
    const { id } = req.params
    actionModel
    .update(id, actionInfo)
    .then(action => {
        if (action) {
            res.status(200).json([{message: "The action has been updated!"}, action])
        } else {
            res.status(404).json({message: "The action could not be updated, it was not found"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "There was an error updating the action"})
    })
})

//Delete

router.delete("/:id", (req, res) => {
    actionModel
    .remove(req.params.id)
    .then(action => {
        if(action > 0) {
            res.status(200).json([{message: "The selected action has been deleted."}, action])
        } else { res.status(404).json({message: "The action could not be found."})}
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error deleted the selected action."})
    })
})

module.exports = router;