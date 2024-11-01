<template>
	<div class="quick006">
		<ul>
			<li>
				<a href="#"><i class="fab fa-facebook-f"></i>Facebook</a>
			</li>
			<li>
				<a href="#"><i class="fab fa-twitter"></i>Twitter</a>
			</li>
			<li>
				<a href="#"><i class="fab fa-google"></i>Google+</a>
			</li>
			<!-- <li>
				<a href="#"><i class="fab fa-linkedin"></i>Linkedin</a>
			</li> -->
			<li>
				<a href="#"><i class="fab fa-instagram"></i>Instagram</a>
			</li>
		</ul>
	</div>
</template>

<script setup></script>

<style lang="scss">
	.quick006 {
		margin: 0;
		padding: 0;
		background: #262626;
		width: 100%;
		height: 100px;
		position: relative;
		ul {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			margin: 0;
			padding: 0;
			display: flex;
		}
		ul li {
			list-style: none;
			margin-top: 0;
		}
		ul li a {
			position: relative;
			display: block;
			width: 150px;
			height: 80px;
			line-height: 80px;
			text-align: center;
			font-size: 16px;
			color: #fff;
			font-family: sans-serif;
			text-decoration: none;
			border: 1px solid #000;
			border-right: none;
			&:hover {
				color: #fff;
			}
		}
		ul li:last-child a {
			border-right: 1px solid #000;
		}

		ul li a::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #f00;
			overflow: hidden;
			z-index: -1;
			transform: scaleX(0);
			transform-origin: right;
			transition: transform 0.5s ease-in-out;
		}
		ul li a:hover::before {
			transform-origin: left;
			transform: scaleX(1);
		}

		ul li:nth-child(1) a::before {
			background: #3b5999;
		}
		ul li:nth-child(2) a::before {
			background: #55acee;
		}
		ul li:nth-child(3) a::before {
			background: #dd4b39;
		}
		ul li:nth-child(4) a::before {
			background: #0077b5;
		}
		ul li:nth-child(5) a::before {
			background: #e4405f;
		}
	}
</style>
