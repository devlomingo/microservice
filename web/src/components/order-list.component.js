import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Order = props => (
  <tr>
    <td>{props.order.customerName}</td>
    <td>{props.order.bookTitle}</td>
    <td>{props.order.issueDate.substring(0, 10)}</td>
    <td>{props.order.endDate.substring(0, 10)}</td>
    <td>
      <Link to={"/editorder/" + props.order._id}>edit</Link> | <a href="#" onClick={() => { props.deleteOrder(props.order._id) }}>delete</a>
    </td>
  </tr>
)

export default class OrderList extends Component {
  constructor(props) {
    super(props);

    this.deleteOrder = this.deleteOrder.bind(this)

    this.state = { orders: [] };
  }
  //'http://localhost:6000/orders/
  //process.env.ORDERSERVICE + '/orders/'
  componentWillMount() {
    axios.get(process.env.REACT_APP_API_GATEWAY_URL + '/orders/')
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch((error) => {
        this.setState = { orders: [] };
      })
  }

  deleteOrder(id) {
    axios.delete(process.env.REACT_APP_API_GATEWAY_URL + '/order/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      orders: this.state.orders.filter(el => el._id !== id)
    })
  }

  orderList() {
    return this.state.orders.map(currentorder => {
      return <Order order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Orders</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Customer</th>
              <th>BookTitle</th>
              <th>IssueDate</th>
              <th>EndDate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.orderList()}
          </tbody>
        </table>
      </div>
    )
  }
}