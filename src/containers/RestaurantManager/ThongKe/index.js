/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-debugger */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import {
  thongKeByMonthApi,
  thongKeByYearApi,
} from 'api/RestaurantManger/billApi';

import { ToastContext } from 'components/Providers/Toast';
import handleToast from 'helpers/handleToast';

import { Bar, Line, Radar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const ThongKe = () => {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [loai, setLoai] = useState(1);

  const { toast } = useContext(ToastContext);

  const fetchYearData = async () => {
    try {
      let req;

      // debugger;
      if (year !== 0 && month !== 0) {
        req = await thongKeByMonthApi(year, month);
      } else {
        req = await thongKeByYearApi(year);
      }

      const { status, error, data: currentData } = req;

      if (status === 'failed' && error) throw new Error(error.message);

      if (status === 'success' && currentData) {
        setData(() => currentData.data);
        handleToast(toast, 'Cập nhật dữ liệu thành công');
        setYear(() => 0);
        setMonth(() => 0);
      }
      return true;
    } catch (error) {
      console.log(error);
      return handleToast(toast, error.message, false);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchYearData();
  };

  const randomNumber = () => {
    let so = 0;
    do {
      so = Math.ceil(Math.random() * 100);
    } while (so <= 0 && so > 255);

    return so;
  };

  const getBackground = () => {
    const so1 = randomNumber();
    const so2 = randomNumber();
    const so3 = randomNumber();

    return [
      `rgba(${so1}, ${so2}, ${so3}, 0.2)`,
      `rgba(${so1}, ${so2}, ${so3}, 1)`,
    ];
  };

  const dataNumber = [];
  const dataLabel = [];
  const dataBackground = [];
  const dataBackgroundAll = [];
  if (data) {
    // debugger;
    for (const item in data) {
      dataLabel.push(item);
      dataNumber.push(data[item]);
      const background = getBackground();
      dataBackground.push(background[0]);
      dataBackgroundAll.push(background[1]);
    }
  }

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Thống kê</h1>

      <Card className="shadow mb-4">
        <CardHeader className="py-3 d-flex flex-column">
          <h6 className="m-0 font-weight-bold text-primary mb-3">
            Thống kê chi tiết
          </h6>

          <div className="dataTables-filter d-flex justify-content-between align-items-center">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="exampleSelect">Loại biểu đồ</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  onChange={(evt) =>
                    setLoai(() => parseInt(evt.target.value, 10))
                  }
                >
                  <option value={1}>Line</option>
                  <option value={2}>Bar</option>
                  <option value={3}>Radar</option>
                  {/* <option>3</option>
                  <option>4</option>
                  <option>5</option> */}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="year">Năm</Label>
                <Input
                  name="year"
                  id="year"
                  type="number"
                  placeholder="Chọn năm"
                  value={year}
                  onChange={(evt) => setYear(parseInt(evt.target.value, 10))}
                />
              </FormGroup>

              <FormGroup>
                <Label for="month">Tháng</Label>
                <Input
                  name="month"
                  id="month"
                  type="number"
                  placeholder="Chọn tháng"
                  value={month}
                  onChange={(evt) => setMonth(parseInt(evt.target.value, 10))}
                />
              </FormGroup>

              <Button
                className="mb-3 ml-2"
                type="submit"
                outline
                color="success"
              >
                Thống kê
              </Button>
            </Form>
          </div>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            {data &&
              (() => {
                switch (loai) {
                  case 1:
                    return (
                      <Line
                        data={{
                          labels: dataLabel,
                          datasets: [
                            {
                              label: '# of Votes',
                              data: dataNumber,
                              // data: [, 2],
                              backgroundColor: dataBackground,
                              borderColor: dataBackgroundAll,
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{ maintainAspectRatio: false }}
                      />
                    );
                    break;
                  case 2:
                    return (
                      <Bar
                        data={{
                          labels: dataLabel,
                          datasets: [
                            {
                              label: '# of Votes',
                              data: dataNumber,
                              // data: [, 2],
                              backgroundColor: dataBackground,
                              borderColor: dataBackgroundAll,
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{ maintainAspectRatio: false }}
                      />
                    );
                    break;
                  case 3:
                    return (
                      <Radar
                        data={{
                          labels: dataLabel,
                          datasets: [
                            {
                              label: '# of Votes',
                              data: dataNumber,
                              // data: [, 2],
                              backgroundColor: dataBackground,
                              borderColor: dataBackgroundAll,
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{ maintainAspectRatio: false }}
                      />
                    );
                }
              })()}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ThongKe;
