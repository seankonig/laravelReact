<?php

namespace App\Http\Controllers;
use App\Task;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate admin login
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'due_date' => 'required|date'
        ]);

        $user = Auth::user();
        
        // create new user
        $task = new Task([
            'title' => $request->title,
            'description' => $request->description,
            'user_id' => $user->id,
            'due_date' => Carbon::createFromFormat('Y-m-d', $request->due_date)->toDateString()
        ]);

        $task->save();

        return response()->json([
            'message' => 'success',
            'task' => $task
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        if ($request->selectedDate) {
            //select tasks for specified date
            $tasks = Task::where('user_id', '=', Auth::user()->id)->whereDate('due_date', '=', Carbon::parse($request->selectedDate)->toDateString())->get();
            //return tasks
            return response()->json([
                'tasks' => $tasks
            ], 200);
        } else {
            // get default tasks for today
            $tasks = Task::where('user_id', '=', Auth::user()->id)->whereDate('due_date', '=', Carbon::today())->get();
            // return default
            return response()->json([
                'tasks' => $tasks
            ], 200);
        }

        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
