import axios from "axios";

const GetCommentList = async (bookid) => {
    const GetCommentListURL = `http://127.0.0.1:8000/library/detail/${bookid}/comment/list/`;
    const token = localStorage.getItem('userToken');

    try {
        const response = await axios.get(GetCommentListURL, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })

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


export default GetCommentList;
