import {Router} from "express";

import { Todo } from "../models/todo";


type RequestBody ={text: string}
type RequestParams = { todoId : string}

let todos:Todo[]=[];
const router = Router();

router.get("/get",(req,res,next)=>{
    res.status(200).json({
        todos:todos
    })
});

router.post("/todo",(req,res,next)=>{
    const body = req.body as RequestBody;
    const newTodo: Todo ={
        id:new Date().toISOString(),
        text: body.text,
    }
    console.log(newTodo.text)
    todos.push(newTodo);
    res.status(201).json({
        message: "Added Todo",
        todo: newTodo,
        todos: todos
    })
})

router.put("/todo/:todoId",(req,res,next)=>{
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid)
    if(todoIndex>=0)
    {
        todos[todoIndex]={ id: todos[todoIndex].id , text: req.body.text};
        return res.status(200).json({message: "updated Todo"})
    }
    res.status(404).json({message:"could not find todo with this id"});
})

router.delete("/todo/:todoId",(req,res,next)=>{
     todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({
        message: "deleted Todo",
        todos: todos
    })
})

export default router;


