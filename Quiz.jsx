import React from "react";
export default class Quiz extends React.Component
{
    render(){
        return(
            <div>
            <button onClick={()=> this.java()}>JAVA</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={()=> this.python()}>Python</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={()=> this.sql()}>SQL</button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        );
    }

    java(){
        return(
        <div>
            <form>
            <h1>JAVA QUESTIONS: </h1>
            </form>
        </div>
        );
    }
}