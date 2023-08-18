import axios from "axios";

const CreateComment = async (bookid, page, parentComment_id, comment) => {
    const CreateURL = `/library/detail/${bookid}/comment/create/`;
    const token = localStorage.getItem('userToken');

    try {
        const response = await axios.post(CreateURL, {
            'parentComment_id': parentComment_id,
            'page': page,  // 이 부분 추가  
            'comment': comment
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('userToken');
            alert('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
            throw new Error('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
        } else {
            throw new Error('유저 정보를 가져오는데 실패했습니다.');
        }
    }
};


export default CreateComment;
