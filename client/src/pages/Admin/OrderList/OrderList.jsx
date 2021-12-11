import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import LoadingBox from "../../../components/LoadingBox/LoadingBox";
import MessageBox from "../../../components/MessageBox/MessageBox";
import "./OrderList.css";
export default function Orderlist() {
  const loading = 0,
    error = 0;
  return (
    <div>
      <Header />
      <h1>Orders</h1>
      <Link to="/admin">
        <h3>Back to dashboard</h3>
      </Link>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="OrderList-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>619bcc65e2589f22ac4c5375</td>
                <td>Nguyen Duc Dat</td>
                <td>22/11/2021</td>
                <td>500.000 VNĐ</td>
                <td>Bank</td>
                <td>No</td>
                <td>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="OrderList-button OrderList-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
