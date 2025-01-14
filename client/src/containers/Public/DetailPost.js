import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions/post";
import { Slider } from "../../components";
import icons from "../../ultils/icons";
import {underMap} from "../../ultils/constant"
import {BoxInfo, RelatedPost} from "../../components"
const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, BsHash } = icons

const DetailPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        postId && dispatch(getPostsLimit({ id: postId }));
    }, [postId]);
    return (
        <div className="w-full flex gap-4">
            <div className="w-[70%]">
                <Slider images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
                <div className="bg-white p-4 rounded-md shadow-md">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold text-red-600">{posts[0]?.title}</h2>
                        <div>
                            <span>Chuyên mục: </span>
                            <span className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer">{posts[0]?.overviews?.area}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <HiLocationMarker color="#2563EB"></HiLocationMarker>
                            <span>{posts[0]?.address}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1">
                                <TbReportMoney />
                                <span class="font-semibold text-lg text-green-600">{posts[0]?.attributes?.price}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <RiCrop2Line />
                                <span>{posts[0]?.attributes?.acreage}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <BsStopwatch />
                                <span>{posts[0]?.attributes?.published}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <BsHash />
                                <span>{posts[0]?.attributes?.hashtag}</span>
                            </span>

                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
                        <div className="flex flex-col gap-3">
                            {
                                posts[0]?.description && JSON.parse(posts[0]?.description).map((item, index) => {
                                    return (

                                        <span key={index}>{item}</span>

                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
                        <table className="w-full">
                            <tbody className="w-full">
                                <tr className="w-full">
                                    <td className="p-2">Mã tin</td>
                                    <td className="p-2">{posts[0]?.overviews?.code}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full bg-gray-200">
                                <tr className="w-full">
                                    <td className="p-2">Khu vực</td>
                                    <td className="p-2">{posts[0]?.overviews?.area}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full">
                                <tr className="w-full">
                                    <td className="p-2">Loại tin rao</td>
                                    <td className="p-2">{posts[0]?.overviews?.type}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full bg-gray-200">
                                <tr className="w-full">
                                    <td className="p-2">Đối tượng</td>
                                    <td className="p-2">{posts[0]?.overviews?.target}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full">
                                <tr className="w-full">
                                    <td className="p-2">Gói tin</td>
                                    <td className="p-2">{posts[0]?.overviews?.bonus}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full bg-gray-200">
                                <tr className="w-full">
                                    <td className="p-2">Ngày đăng</td>
                                    <td className="p-2">{posts[0]?.overviews?.created}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full">
                                <tr className="w-full">
                                    <td className="p-2">Ngày hết hạn</td>
                                    <td className="p-2">{posts[0]?.overviews?.expired}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
                        <table className="w-full">
                            <tbody className="w-full">
                                <tr className="w-full">
                                    <td className="p-2">Liên hệ</td>
                                    <td className="p-2">{posts[0]?.user?.name}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full bg-gray-200">
                                <tr className="w-full">
                                    <td className="p-2">Điện thoại</td>
                                    <td className="p-2">{posts[0]?.user?.phone}</td>
                                </tr>
                            </tbody>
                            <tbody className="w-full">
                                <tr className="w-full">
                                    <td className="p-2">Zalo</td>
                                    <td className="p-2">{posts[0]?.user?.zalo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-semibold text-xl my-4">Bản đồ</h3>
                        <span className="text-gray-500 text-sm py-4 text-justify">{underMap[0]}</span>
                        <span className="text-gray-500 text-sm py-4 text-justify italic"> {posts[0]?.title + " - Mã tin " + posts[0]?.attributes.hashtag} </span>
                        <span className="text-gray-500 text-sm py-4 text-justify">{underMap[1]}</span>
                    </div>
                </div>


            </div>
            <div className="w-[30%] flex flex-col gap-8 ">
                <BoxInfo userData = {posts[0]?.user}/>
                <RelatedPost />
                <RelatedPost newPost/>
            </div>
        </div>
    )
};

export default DetailPost;
