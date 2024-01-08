import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { ColorRing } from 'react-loader-spinner';
import { GetStatisticData } from '../Store/StatisticAction';
import ReactApexChart from 'react-apexcharts';
const Dashboard = () => {
  const dispatch = useDispatch();
  const [statisticData, setStatisticData] = useState({})
  const { getStatisticLoading, getStatisticMsg, getStatisticError } = useSelector((state) => state.statistic)
  useEffect(() => {
    dispatch(GetStatisticData())
  }, [])

  useEffect(() => {
    if (getStatisticMsg) {
      setStatisticData(getStatisticMsg)
    }
  }, [getStatisticMsg])
  
  const options = {
    chart: {
      type: 'line',
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
    },
    markers: {
      size: 6,
      strokeWidth: 2,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
  };
  const series = [
    {
      name: 'Payment Orders',
      data: [
        [new Date('2023-10-01').getTime(), 120],
        [new Date('2023-10-04').getTime(), 160],
        [new Date('2023-10-07').getTime(), 220],
        
      ],
    },
    {
      name: 'Cancel Orders',
      data: [
        [new Date('2023-10-01').getTime(), 20],
        [new Date('2023-10-05').getTime(), 40],
        [new Date('2023-10-08').getTime(), 10],
        
      ],
    },
  ];

  const optionspai = {
    labels: ['Payment', 'Refund', 'Cancel', 'Deliverred', 'Accepted'],
    colors: ['#00E396', '#008FFB', '#FF4560', '#FEB019', '#775DD0'],
    legend: {
      show: true,
    },
  };

  const seriespai = [50, 10, 5, 30, 5];
  return (

    <div className="container my-5">
      <div className="row">
        {
          getStatisticLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
            />

          </div>
            :
            <>
            <div className="col-md-3 col-sm-6">
                <div class="alert alert-warning text-center" role="alert">
                  <div>
                    <p> Total Orders </p>
                    {statisticData.totalOrders ? statisticData.totalOrders : 0}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div class="alert alert-primary text-center" role="alert">
                  <div>
                    <p> Accepted Order </p>
                    {statisticData.acceptedOrders ? statisticData.acceptedOrders : 0}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div class="alert alert-light text-center" role="alert">
                  <div>
                    <p> Delivered Order </p>
                    {statisticData.deliveredOrders ? statisticData.deliveredOrders : 0}
                  </div>
                </div>
              </div><div className="col-md-3 col-sm-6">
                <div class="alert alert-danger text-center" role="alert">
                  <div>
                    <p> Cancled Order </p>
                    {statisticData.canceledOrders ? statisticData.canceledOrders : 0}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div class="alert alert-success text-center" role="alert">
                  <div>
                    <p> Total Payments </p>
                    {statisticData.totalPayments ? statisticData.totalPayments : 0}
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 col-sm-6">
                <div class="alert alert-info text-center" role="alert">
                  <div>
                    <p> Total Refund </p>
                    {statisticData.totalRefunds ? statisticData.totalRefunds : 0}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div class="alert alert-secondary text-center" role="alert">
                  <div>
                    <p> UnPaid Order </p>
                    {statisticData.unpaidOrders ? statisticData.unpaidOrders : 0}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div class="alert alert-dark text-center" role="alert">
                  <div>
                    <p> Paid Order </p>
                    {statisticData.paidOrders ? statisticData.paidOrders : 0}
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-center align-items-center'>
              <div className="col-lg-7 mt-4">
                <ReactApexChart options={options} series={series} type="area" height={550} />
              </div>
              <div className="col-lg-5 mt-4 ">
              <ReactApexChart options={optionspai} series={seriespai} type="pie" height={550}/>
              </div>
              </div>

            </>
        }

      </div>
    </div>
  )
}

export default Dashboard

