"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogPost from "./(pages)/post/post";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

interface PostInfo {
	id: number;
	title: string;
	content: string;
	author: string;
}

const PostsPerPage = 8;

export default function Home() {
	const [posts, setPosts] = useState<PostInfo[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isPostsLoaded, setPostsLoaded] = useState(false);

	const router = useRouter();

	useEffect(() => {
		axios.get("api/posts").then((res) => {
			setPosts(res.data.posts);
			console.log(res.data.posts);
			setPostsLoaded(true);
		});
	}, []);

	const indexOfLastPost = currentPage * PostsPerPage;
	const indexOfFirstPost = indexOfLastPost - PostsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const totalPages = Math.ceil(posts.length / PostsPerPage);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
		router.push(`/?page=${currentPage + 1}`);
	};

	const prevPage = () => {
		setCurrentPage(currentPage - 1);
		router.push(`/?page=${currentPage - 1}`);
	};

	const goToPage = (page: number) => {
		setCurrentPage(page);
		router.push(`/?page=${page}`);
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<PaginationItem key={i}>
					<PaginationLink onClick={() => goToPage(i)}>{i}</PaginationLink>
				</PaginationItem>
			);
		}
		return pageNumbers;
	};

	return (
		<main className="flex h-full w-full flex-col items-center justify-center">
			<h1 className="m-5 text-3xl font-semibold">Blogs</h1>

			<div className="m-5">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								className="cursor-pointer"
								onClick={() => {
									if (currentPage === 1) return;
									prevPage();
								}}
							/>
						</PaginationItem>
						{renderPageNumbers()}
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								className="cursor-pointer"
								onClick={() => {
									if (currentPage === totalPages) return;
									nextPage();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
			{!isPostsLoaded ? (
				<div className="grid desktop:grid-cols-4 smartphone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-10 overflow-y-auto">
					<Skeleton className="h-[305px] w-[250px] rounded-xl shadow-3xl" />
				</div>
			) : null}
			<div className="grid desktop:grid-cols-4 smartphone:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-10 overflow-y-auto">
				{currentPosts.reverse().map((post, index) => (
					<div className="flex flex-1" key={index}>
						<BlogPost
							id={post.id}
							title={post.title}
							content={post.content}
							author={post.author}
						/>
					</div>
				))}
			</div>
		</main>
	);
}
