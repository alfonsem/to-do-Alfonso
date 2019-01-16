export interface List{
    listID: number;
    name: string;
    tasks: Array<Task>;
    createdAt: Date;
    modifiedAt: Date;
    
}
export interface Task{
    listID: number;
    taskID: number;
    text: string;
    color: string;
    completed: boolean;
    createAt: Date;
    modifiedAt: Date;

}
export interface Data{
    lists: Array<List>;

}