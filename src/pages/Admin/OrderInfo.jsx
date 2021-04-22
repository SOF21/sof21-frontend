import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GridCell, Grid } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import {
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
} from '@rmwc/data-table';

import { getOrders } from '../../api/ticketPickupCalls';
import { useHistory } from 'react-router-dom'

const OrderComponent = ({ products }) => {

  const [users, setUsers] = useState(undefined)
  const history = useHistory()

  useEffect(() => {
    getOrders().then(response => setUsers(response.data))
  }, [])

  const funkisTable = (
    <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>Namn</DataTableHeadCell>
            <DataTableHeadCell>Mobil</DataTableHeadCell>
            <DataTableHeadCell>Adress</DataTableHeadCell>
            <DataTableHeadCell>Allergier</DataTableHeadCell>
            <DataTableHeadCell>Ordrar</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {users && Object.values(users).filter(user => user.owned_items.length > 0).map((user) => {
            return (
              <DataTableRow key={user.id}>
                <DataTableCell>
                  {user.email}
                </DataTableCell>
                <DataTableCell>
                  {user.phone}
                </DataTableCell>
                <DataTableCell>
                  {user.invoice_address}
                </DataTableCell>
                <DataTableCell style={{whiteSpace: 'normal'}}>
                  {user.allergies}
                </DataTableCell>
                <DataTableCell>
                  {user.owned_items !== [] && user.owned_items.map(item => {
                    const baseProductIds = products.base_products[item.product_id];
                    const baseProduct = products.products[baseProductIds['base_id']];
                    const product = baseProduct.products[baseProductIds['prod_id']];
                    return (
                      <p style={{backgroundColor: item.collected === 1 ? 'lightgreen' : null }} key={item.id}>
                        {item.amount}x {baseProduct.name} {product.kind ? `- ${product.kind}` : null}
                      </p>
                    )
                  })}
                </DataTableCell>
              </DataTableRow>
            )
          }
          )}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  )

  return ( // TODO: Fix in-line text
    <>
      <Grid>
        <GridCell desktop='12' tablet='8' phone='4'>
          <Button raised style={{ width: '100%' }} onClick={() => history.push('/account/admin/ticketpickup')}> Biljettuthämtning </Button>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          {funkisTable}
        </GridCell>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.shop
})

export default connect(mapStateToProps, null)(OrderComponent)