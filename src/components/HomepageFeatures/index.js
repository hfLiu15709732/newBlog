import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
	{
		title: "一站式前端博客",
		Svg: require("@site/static/img/undraw_static_assets_rpm6.svg").default,
		description: (
			<>
				覆盖全面的前端技术学习与分享博客，从最基础到工程项目应用，循序渐进，以最基础的，浅显易懂的方式走进前端的世界
			</>
		),
	},
	{
		title: "期末速成不挂科",
		Svg: require("@site/static/img/undraw_book_lover_re_rwjy.svg").default,
		description: (
			<>
				覆盖多数计算机本科生课程，从基础课程的高数，离散，到专业课程的计网，数据结构，数电模电等等等等.....
			</>
		),
	},
	{
		title: "技术/项目分享",
		Svg: require("@site/static/img/undraw_code_review_re_woeb.svg").default,
		description: (
			<>
				包含对于更种新奇/前言技术的分享，又包含个人亲手项目/看到的有意思的项目分享......
			</>
		),
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
