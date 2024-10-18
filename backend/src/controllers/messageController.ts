import Messages from "../models/messagesModel";

export const  getAllMessages = async (req: any, res: any) => {
    try {
        const {roomid} = req.params;
        const messages = await Messages.findAll({
            where: {
                roomid:roomid
            },
            order: [['createdAt', 'ASC']]

        })
        res.status(200).json({
            success:true,
            messages
        
        })
        return;

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error fetching messages",
            status:false
        })
    }
}