import { Link, Route, Routes } from "react-router-dom";
import "./navbar.css";
import AnimationForm from "../view/Demo/AnimationForm";
import Errwords from "../view/Demo/Errwords";
import HoriScroll from "../view/Demo/HoriScroll";
import InfiScroll from "../view/Demo/InfiScroll";
import { Pokers } from "../view/Demo/Poker";
import Spider from "../view/Demo/Spider";
import ErrorPage from "../view/ErrorPage";
import Home from "../view/Home";
import Notes from "../view/Notes";
import Project from "../view/Project";
import Question from "../view/Question";
export function RoutesComponent() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/project" element={<Project />} />
			<Route path="/notes" element={<Notes />} />
			<Route path="/demo">
				<Route path="pokers" element={<Pokers />} />
				<Route path="errorwords" element={<Errwords />} />
				<Route path="spider" element={<Spider />} />
				<Route path="hori-scroll" element={<HoriScroll />} />
				<Route path="infi-scroll" element={<InfiScroll />} />
				<Route path="animation-form" element={<AnimationForm />} />
			</Route>
			<Route path="/question" element={<Question />} />
			<Route path="/errorwords" element={<Errwords />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export function RoutesNavbar() {
	return (
		<ul className="flex w-full justify-between px-10 z-10">
			<li className="flex-1 text-center">
				<Link to="/">Home</Link>
			</li>
			<li className="flex-1 text-center">
				<Link to="/project">Project</Link>
			</li>
			<li className="flex-1 text-center">
				<Link to="/notes">Notes</Link>
			</li>
			<li className="flex-1 text-center">
				<Link to="/question">Question</Link>
			</li>
			<li className="relative group flex-2 text-center">
				Demo
				<ul className="pointer-events-none group-hover:pointer-events-auto absolute top-full group-hover:opacity-100  opacity-0 transition-opacity duration-300 text-amber-600 left-1/2 -translate-x-1/2  ">
					<li>
						<Link to="/demo/pokers">扑克</Link>
					</li>
					<li>
						<Link to="/demo/errorwords">异常</Link>
					</li>
					<li>
						<Link to="/demo/spider">蜘蛛</Link>
					</li>
					<li>
						<Link to="/demo/hori-scroll">水平</Link>
					</li>
					<li>
						<Link to="/demo/infi-scroll">无限</Link>
					</li>
					<li>
						<Link to="/demo/animation-form">表单</Link>
					</li>
				</ul>
			</li>
			<li className="flex-1 text-center">
				<Link to="/error">ErrorPage</Link>
			</li>
			<li className="flex-1 text-center">
				<button type="button">switch</button>
			</li>
		</ul>
	);
}
