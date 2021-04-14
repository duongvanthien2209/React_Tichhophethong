/* eslint-disable no-sparse-arrays */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import { Bar, Line } from 'react-chartjs-2';

import { thongKeApi } from 'api/Admin/Auth/authApi';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faCalendar,
  faPizzaSlice,
  faUtensils,
  faUsers,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';

const ThongKe = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const { status, error, data: currentData } = await thongKeApi();

    if (status === 'failed' && error) throw new Error(error.message);

    if (status === 'success' && currentData) {
      // const { restaurantTypes } = data;
      // return restaurantTypes;
      setData(() => currentData);
    }
    return true;
  };

  useEffect(() => {
    if (!data) fetchData();
  }, []);

  const numberData = [];
  if (data) {
    for (const item in data) numberData.push(data[item]);
  }

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      {data && (
        <Row>
          <Col className="mb-4" xl="3" md="6">
            <Card className="border-left-primary shadow h-100 py-2">
              <CardBody>
                <Row className="no-gutters align-items-center">
                  <Col className="mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Số món ăn
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {data.foodTotal}
                    </div>
                  </Col>
                  <Col className="col-auto">
                    <FontAwesomeIcon
                      className="fa-2x text-gray-300"
                      icon={faPizzaSlice}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col className="mb-4" xl="3" md="6">
            <Card className="border-left-success shadow h-100 py-2">
              <CardBody>
                <Row className="no-gutters align-items-center">
                  <Col className="mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Số nhà hàng
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {data.restaurantTotal}
                    </div>
                  </Col>
                  <Col className="col-auto">
                    <FontAwesomeIcon
                      className="fa-2x text-gray-300"
                      icon={faUtensils}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col className="mb-4" xl="3" md="6">
            <Card className="border-left-info shadow h-100 py-2">
              <CardBody>
                <Row className="no-gutters align-items-center">
                  <Col className="mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Số người sử dụng
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {data.userTotal}
                    </div>
                  </Col>
                  <Col className="col-auto">
                    <FontAwesomeIcon
                      className="fa-2x text-gray-300"
                      icon={faUsers}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col className="mb-4" xl="3" md="6">
            <Card className="border-left-warning shadow h-100 py-2">
              <CardBody>
                <Row className="no-gutters align-items-center">
                  <Col className="mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Số loại món ăn
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {data.foodTypeTotal}
                    </div>
                  </Col>
                  <Col className="col-auto">
                    <FontAwesomeIcon
                      className="fa-2x text-gray-300"
                      icon={faBoxOpen}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        <Col md="12">
          <Card className="shadow mb-4">
            <CardHeader className="py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Biểu đồ tổng thể
              </h6>
            </CardHeader>

            <CardBody>
              <div className="chart-area">
                {data && (
                  <Bar
                    data={{
                      labels: [
                        'Món ăn',
                        'Nhà hàng',
                        'Người dùng',
                        'Loại món ăn',
                      ],
                      datasets: [
                        {
                          label: '# of Votes',
                          data: numberData,
                          // data: [, 2],
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            // 'rgba(153, 102, 255, 1)',
                            // 'rgba(255, 159, 64, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ThongKe;
