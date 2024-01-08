import { createSlice } from "@reduxjs/toolkit"
import { AddCoupon,GetCoupon ,DeleteCoupon} from "../CouponAction"
const CouponSlice = createSlice({
    name: "CouponSlice",
    initialState: {
        addCouponLoading: false,
        addCouponMsg: null,
        addCouponError: null, 
        getCouponLoading: false,
        getCouponMsg: null,
        getCouponError: null,
        deleteCouponLoading:false,
        deleteCouponMsg:null,
        deleteCouponError:null,
    },
    extraReducers: {
        [AddCoupon.pending]: (state) => {
            state.addCouponLoading = true
            state.addCouponMsg = null
            state.addCouponError = null
        },
        [AddCoupon.fulfilled]: (state, { payload }) => {
            state.addCouponLoading = false
            state.addCouponMsg = payload
            state.addCouponError = null
        },
        [AddCoupon.rejected]: (state, { payload }) => {
            state.addCouponLoading = false
            state.addCouponMsg = payload
            state.addCouponError = null
        },
        [GetCoupon.pending]: (state) => {
            state.getCouponLoading = true
            state.getCouponMsg = null
            state.getCouponError = null
        },
        [GetCoupon.fulfilled]: (state, { payload }) => {
            state.getCouponLoading = false
            state.getCouponMsg = payload
            state.getCouponError = null
        },
        [GetCoupon.rejected]: (state, { payload }) => {
            state.getCouponLoading = false
            state.getCouponMsg = payload
            state.getCouponError = null
        },
        [DeleteCoupon.pending]: (state) => {
            state.deleteCouponLoading = true
            state.deleteCouponMsg = null
            state.deleteCouponError = null
        },
        [DeleteCoupon.fulfilled]: (state, { payload }) => {
            state.deleteCouponLoading = false
            state.deleteCouponMsg = payload
            state.deleteCouponError = null
        },
        [DeleteCoupon.rejected]: (state, { payload }) => {
            state.deleteCouponLoading = false
            state.deleteCouponMsg = payload
            state.deleteCouponError = null
        },
    }
})

export default CouponSlice.reducer;