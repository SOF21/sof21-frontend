import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { GridCell, Grid } from "@rmwc/grid"
import { Button } from "@rmwc/button"
import {
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
} from "@rmwc/data-table"

import { getOrders } from "../../api/ticketPickupCalls"
import { useHistory } from "react-router-dom"

import { CSVLink } from "react-csv"

const OrderComponent = ({ products }) => {
  const [users, setUsers] = useState({})
  const [CSVdata, setCSVdata] = useState([])

  const history = useHistory()

  useEffect(() => {
    getOrders().then((response) => setUsers(response.data))
  }, [])

  const getData = () => {
    const res = Object.values(users)
      .filter((user) => user.owned_items.length > 0)
      .map((user) => {
        const items = user.owned_items.map((item) => {
          const baseProductIds = products.base_products[item.product_id]
          const baseProduct = products.products[baseProductIds["base_id"]]
          const product = baseProduct.products[baseProductIds["prod_id"]]
          return [
            ` ${item.amount}x ${baseProduct.name} ${
              product.kind ? `- ${product.kind}` : ""
            }`,
          ]
        })
        console.log(items)
        return [user.email, user.phone, user.pick_up_point, items]
      })

    res.unshift(["email", "phone", "pickup", "items"])
    console.log(res)
    return res
  }

  const csvData = getData()

  const funkisTable = (
    <DataTable style={{ width: "100%" }}>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>Namn</DataTableHeadCell>
            <DataTableHeadCell>Mobil</DataTableHeadCell>
            <DataTableHeadCell>Adress</DataTableHeadCell>
            <DataTableHeadCell>Ordrar</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {Object.values(users)
            .filter((user) => user.owned_items.length > 0)
            .map((user) => {
              console.log(user)
              return (
                <DataTableRow key={user.id}>
                  <DataTableCell>
                    <Button
                      style={{ fontSize: "12px" }}
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(user.email)
                      }}
                    >
                      {user.email}
                    </Button>
                  </DataTableCell>
                  <DataTableCell>{user.phone}</DataTableCell>
                  <DataTableCell style={{ whiteSpace: "normal" }}>
                    {user.pick_up_point}
                  </DataTableCell>
                  <DataTableCell>
                    {user.owned_items !== [] &&
                      user.owned_items.map((item) => {
                        const baseProductIds =
                          products.base_products[item.product_id]
                        const baseProduct =
                          products.products[baseProductIds["base_id"]]
                        const product =
                          baseProduct.products[baseProductIds["prod_id"]]
                        return (
                          <p
                            style={{
                              backgroundColor:
                                item.collected === 1 ? "lightgreen" : null,
                            }}
                            key={item.id}
                          >
                            {item.amount}x {baseProduct.name}{" "}
                            {product.kind ? `- ${product.kind}` : null}
                          </p>
                        )
                      })}
                  </DataTableCell>
                </DataTableRow>
              )
            })}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  )

  return (
    // TODO: Fix in-line text
    <>
      <Grid>
        <GridCell desktop='12' tablet='8' phone='4'>
          Grön markering innebär att ordern blivit packad.
          <br />
          <br />
          Du kan inte checka av en order i taget, utan bara en <i>person</i> i
          taget. Det gör du genom att kopiera mailen, gå in i biljettuthämtning
          och klistra in mailen i kodfältet. Du har då möjligheten att hämta ut
          alla varor.
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          <Button
            raised
            style={{ width: "100%" }}
            onClick={() => history.push("/account/admin/ticketpickup")}
          >
            Biljettuthämtning
          </Button>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          {
            <CSVLink
              style={{ textDecoration: "none" }}
              filename='ordrar.csv'
              data={csvData}
            >
              {
                <Button
                  raised
                  style={{ width: "100%" }}
                  onClick={() => getData()}
                >
                  CSV
                </Button>
              }
            </CSVLink>
          }
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          {funkisTable}
        </GridCell>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => ({
  products: state.shop,
})

export default connect(mapStateToProps, null)(OrderComponent)
