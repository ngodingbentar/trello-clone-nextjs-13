import { memo } from "react";
import Task from "./Task";
import { ITask } from "@/typings";

interface Props {
	tasks: ITask[];
}
const TaskList = ({ tasks }: Props) => {
	return (
		<div>
			{tasks.map((task: ITask, index) => (
				<Task key={task.id} task={task} index={index} />
			))}
		</div>
	);
};
export default memo(TaskList);
