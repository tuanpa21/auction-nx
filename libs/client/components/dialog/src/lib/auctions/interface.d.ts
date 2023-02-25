import { IProps } from "../interface";

export interface IItemAuction {
    id: string;
    itemId: string;
    userId: string;
    cost: number;
    createdAt: string;
    updatedAt: string;
}

export interface IItemAuctionData extends IProps {
    data?: IItemAuction[];
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}