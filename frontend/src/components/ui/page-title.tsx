type Props = {
    title: string;
};

export const PageTitle = ({ title }: Props) => {
    return <h1 className='text-2xl font-bold text-gray-900 mb-8'>{title}</h1>;
};
