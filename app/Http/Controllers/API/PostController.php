<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class PostController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $user = Post::find($userId);
        // var_dump($user);
        // return Post::find(1);
        // return Post::latest()->user->paginate(10);
        $post = Post::findOrFail($id);
        foreach ($post->users as $user) {
            return $post->productsname;
        }

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
        // dd(auth()->id());
        $userId = auth()->id();
        $request['user_id'] = $userId;
        Post::create($request->all());
        return ['message' => 'Post Created'];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ini  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $post->update($request->all());
        return ['message' => 'Updated Succesful'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        $post->delete();

        return['message' => 'User Deleted'];
    }
}
