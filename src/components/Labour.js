import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  // wallpaper: {
  //   minWidth: '1000px',
  //   backgroundImage: "url(" + "https://ds393qgzrxwzn.cloudfront.net/resize/m720x480/cat1/img/images/0/oVdn7vdDPw.jpg" + ")",
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat'
  // },
  root: {
    margin: theme.spacing(3),
    padding: theme.spacing(),
    backgroundColor: '#FAFAFA',
  },
  btn: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),

  },
  paper: {
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
    }
  },
  form: {
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  p: {
    color: 'red',
    margin: theme.spacing(1),
    fontSize: "10px",

  },
  scroll: {
    border: '1px solid #eeccee',
    maxHeight: '534px',
    minHeight: '534px',
    overflowY: 'scroll',

  },
  delroot: {
    cursor: 'pointer',
    margin: theme.spacing(3)
  },
}))

const initialValues = {
  name: "",
  mob: "",
  address: "",
  date: "",

}
export default function Labour() {
  const insertDate = 'http://localhost:8081/sweet/insert'
  const delData = 'http://localhost:8081/sweet/delete'
  const [storeData, setstoreData] = useState([])
  const [open, setopen] = useState(false)
  // dialog for adding 
  const [values, setValues] = useState(initialValues)
  const [empty, setEmpty] = useState({})
  const [submit, setSubmit] = useState(false)
  // dialog for delete
  const [del, setDel] = useState(false)
  const [delVal, setdelVal] = useState(0)

  useEffect(() => {
    fetchData()
  }, [storeData])

  const fetchData = () => {
    const url = 'http://localhost:8081/sweet/labourData'
    axios.get(url).then((res) => {
      // console.log(res.data)
      setstoreData(res.data)
    })
  }

  const handleOpen = () => {
    setopen(true)
    console.log(open)
  }
  const handleClose = () => {
    setopen(false)
    setEmpty({})

  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }
  const handleAdd = () => {
    // console.log("click")
    setEmpty(validate(values))
    setSubmit(true)
  }

  useEffect(() => {
    if (Object.keys(empty).length === 0 && submit) {
      axios.get(insertDate, {
        params: {
          name: values.name,
          mob: values.mob,
          address: values.address,
          date: values.date,
        }
      })
      setopen(false)
      setValues(initialValues)
    }
  }, [empty])

  const validate = (values) => {
    const e = {}
    if (!values.name) {
      e.name = 'name required'
    }
    if (!values.mob) {
      e.mob = 'mobile number required'
    }
    if (!values.address) {
      e.address = 'address required'
    }
    if (!values.date) {
      e.date = 'date required'
    }
    return e
  }
  const handleDelete = (id) => {
    // console.log(id)
    setdelVal(id)
    setDel(true)
  }
  const handleDelClose = () => {
    setDel(false)
    setdelVal(0)
  }
  const DeleteLabour = () => {
    axios.get(delData, {
      params: {
        id: delVal
      }
    })
    setdelVal(0)
    setDel(false)
  }

  const classes = useStyles()

  return (
    <>
      <Navbar />
      <Grid container direction='column' alignItems='center' className={classes.wallpaper}>
        <Grid item alignItems='center'>
          <Button variant="contained" color="primary"
            className={classes.btn}
            size='large'
            onClick={handleOpen}
          >
            ADD Labour
          </Button>
          <Button variant="contained" color="secondary"
            className={classes.btn}
            size='large'
          >
            Delete Labour
          </Button>
        </Grid>

        <Grid item className={classes.root} >
          <TableContainer component={Paper} className={classes.scroll}>
            <Table size='medium'>
              <TableHead >
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Mob.no</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Join Date</TableCell>
              </TableHead>
              <TableBody >
                {
                  storeData.map((item) => (
                    <TableRow key={item.id}>
                      {/* <TableCell>{item.id}</TableCell> */}
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.mob}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell><DeleteIcon onClick={() => { handleDelete(item.id) }}></DeleteIcon></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {'Add New Labour'}
        </DialogTitle>
        <DialogContent>
          <Paper className={classes.paper}>
            <form className={classes.form}>
              <Grid container >
                <Grid item >
                  <TextField
                    variant="outlined"
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                  />
                  <p className={classes.p}>{empty.name}</p>
                  <TextField
                    variant="outlined"
                    label="Mobile No."
                    name="mob"
                    value={values.mob}
                    onChange={handleInputChange}
                  />
                  <p className={classes.p}>{empty.mob}</p>
                  <Grid item >
                    <TextField
                      variant="outlined"
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={handleInputChange}
                    />
                    <p className={classes.p}>{empty.address}</p>
                    <TextField
                      variant="outlined"
                      label="Date"
                      name="date"
                      value={values.date}
                      onChange={handleInputChange}
                    />
                    <p className={classes.p}>{empty.date}</p>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}
            color="primary" autoFocus>
            ADD
          </Button>
          <Button onClick={handleClose}
            color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={del} >
        <DialogTitle style={{ marginLeft: '15px' }} >{"are you sure?"}</DialogTitle>
        <Grid container alignItems='baseline'>

          <Grid item className={classes.delroot} >
            <Button size='small' onClick={DeleteLabour}
              color="primary" autoFocus>
              Yes!
            </Button>
          </Grid>
          <Grid item className={classes.delroot} >
            <Button size='small' onClick={handleDelClose}
              color="secondary" autoFocus>
              No
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}
