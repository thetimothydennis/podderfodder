import { Cookies } from "react-cookie";

function NavBar() {
	const handleClick = () => {
		const cookie = new Cookies();
		cookie.set("userId", "");
	};

	return (
		<div className="container NavBarContainer">
			<div className="row NavBarRow">
				<div
					className="col-sm"
					id={-3}>
					<b id={-3}>Search and Add</b>
				</div>
				<div
					className="col-sm"
					id={-1}>
					<b id={-1}>All Podcasts</b>
				</div>
				<div
					className="col-sm"
					id={-2}>
					<b id={-2}>All Episodes</b>
				</div>
				<div className="col-sm">
					<b>
						<a
							onClick={handleClick}
							href="/api/logout">
							Logout
						</a>
					</b>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
