// import React, { useState } from 'react';
// import { columns } from './CourseTableColumns';
// import { DataTable } from '../../../utils/DataTable';
// import { useFetchCourses } from '@/hooks/course/useFetchCourses';
// import { DefaultWarning } from '@/utils/DefaultWarning';
// import { Button } from '@/components/ui/button';
// import { PlusCircle, Search } from 'lucide-react';
// import { Input } from '@/components/ui/input';

// export const CourseTable = () => {
// 	const [currentPage, setCurrentPage] = useState(0);
// 	const [searchTerm, setSearchTerm] = useState('');
// 	const pageSize = 15;
// 	const skip = currentPage * pageSize;

// 	const { data, loading, error, total } = useFetchCourses(skip, pageSize, searchTerm);

// 	const handlePageChange = (pageIndex: number) => {
// 		setCurrentPage(pageIndex);
// 	};

// 	if (loading) {
// 		return (
// 			<div className='container mx-auto py-10'>
// 				<DefaultWarning message='Carregando...' />
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className='container mx-auto py-10'>
// 				<p>Erro ao buscar Cursos</p>
// 			</div>
// 		);
// 	}

// 	const totalPages = Math.ceil(total / pageSize);

// 	return (
// 		<div className='container mx-auto py-10'>
// 			<div className='flex justify-between mb-4'>
// 				<Input
// 					variant={'search'}
// 					type='text'
// 					placeholder='Busque por Nome ou Email...'
// 					value={searchTerm}
// 					onChange={(e) => setSearchTerm(e.target.value)}
// 					className='px-2 py-2 border rounded-md'
// 				/>
// 				<Button className='mx-4'>
// 					<Search />
// 				</Button>
// 				<a href='/cadastrarCurso'>
// 					<Button>
// 						<PlusCircle className='pr-2' />
// 						Add New Course
// 					</Button>
// 				</a>
// 			</div>
// 			<DataTable columns={columns} data={data} />
// 			<div className='flex justify-center mt-4'>
// 				{Array.from({ length: totalPages }).map((_, index) => (
// 					<Button
// 						key={index}
// 						onClick={() => handlePageChange(index)}
// 						className={`mx-1 ${currentPage === index ? '' : 'bg-gray-500'}`}>
// 						{index + 1}
// 					</Button>
// 				))}
// 			</div>
// 		</div>
// 	);
// };
