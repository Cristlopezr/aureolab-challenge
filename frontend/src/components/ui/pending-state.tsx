type Props = {
    text: string;
    subtext?: string;
};

export const PendingState = ({ text, subtext }: Props) => {
    return (
        <div className='pt-40 mx-auto'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4'></div>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>{text}</h2>
                <p className='text-gray-600'>{subtext ? subtext : 'Please wait...'}</p>
            </div>
        </div>
    );
};
