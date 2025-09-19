import React from "react";
import styles from "./Footer.module.css";

function Footer() {
	const year = new Date().getFullYear();

	return (
		<span className={styles.footer}>
			<span>{year} Jam Planner Inc.</span>
		</span>
	);
}

export default Footer;
