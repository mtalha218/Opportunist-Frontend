import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Buyer, Employer, JobSeeker, Seller } from "services/routes";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = ({ authenticated, logout }) => {
  const [userImage, setUserImage] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const img = JSON.parse(localStorage.getItem("user"));
    setUserImage(img.profileImg);
    setUserRole(img.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [authenticated]);
  const [data, setData] = useState("");
  const signout = () => {
    logout();
    navigate("/auth/login");
  };
  const toProfile = () => {
    navigate("/user/profile");
  };
  const login = () => {
    navigate("/auth/login");
  };

  const toGigs = () => {
    navigate(`/user/allgig/${data}`);
  };
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (id) => {
    navigate(id);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            The Opporturist
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {authenticated ? (
              <>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={() => handleCloseNavMenu("/user/dashboard")}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseNavMenu("/user/aboutUs")}>
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                  {userRole !== "Admin" && (
                    <MenuItem onClick={() => handleCloseNavMenu("/user/blogs")}>
                      <Typography textAlign="center">Blogs</Typography>
                    </MenuItem>
                  )}
                  {userRole === "Employer" ? (
                    <>
                      {Employer.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : userRole === "Buyer" ? (
                    <>
                      {Buyer.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : userRole === "Seller" ? (
                    <>
                      {Seller.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : userRole === "Job Seeker" ? (
                    <>
                      {JobSeeker.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/allusers")}
                      >
                        <Typography textAlign="center">All Users</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/queries")}
                      >
                        <Typography textAlign="center">Queries</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/addBlogs")}
                      >
                        <Typography textAlign="center">Add Blogs</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/viewBlogs")}
                      >
                        <Typography textAlign="center">My Blogs</Typography>
                      </MenuItem>
                    </>
                  )}
                </Menu>

                <div className="input-group  border rounded-pill p-1 w-25">
                  <input
                    type="search"
                    placeholder="What're you searching for?"
                    aria-describedby="button-addon3"
                    className="form-control bg-none border-0"
                    // eslint-disable-next-line no-restricted-globals
                    onChange={() => setData(event.target.value)}
                  />
                  <div className="input-group-append border-0">
                    <button
                      id="button-addon3"
                      type="button"
                      className="btn btn-link text-success"
                      onClick={toGigs}
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            The Opporturist
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {authenticated ? (
              <>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={() => handleCloseNavMenu("/user/dashboard")}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseNavMenu("/user/aboutUs")}>
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                  {userRole !== "Admin" && (
                    <MenuItem onClick={() => handleCloseNavMenu("/user/blogs")}>
                      <Typography textAlign="center">Blogs</Typography>
                    </MenuItem>
                  )}
                  {userRole === "Employer" ? (
                    <>
                      {Employer.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : userRole === "Buyer" ? (
                    <>
                      {Buyer.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : userRole === "Seller" ? (
                    <>
                      {Seller.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : userRole === "Job Seeker" ? (
                    <>
                      {JobSeeker.map(({ path, name }) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleCloseNavMenu(path)}
                        >
                          <Typography textAlign="center">{name}</Typography>
                        </MenuItem>
                      ))}
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/allusers")}
                      >
                        <Typography textAlign="center">All Users</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/queries")}
                      >
                        <Typography textAlign="center">Queries</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/addBlogs")}
                      >
                        <Typography textAlign="center">Add Blogs</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseNavMenu("/user/viewBlogs")}
                      >
                        <Typography textAlign="center">My Blogs</Typography>
                      </MenuItem>
                    </>
                  )}
                </Menu>

                <div className="input-group  border rounded-pill p-1 w-25">
                  <input
                    type="search"
                    placeholder="What're you searching for?"
                    aria-describedby="button-addon3"
                    className="form-control bg-none border-0"
                    // eslint-disable-next-line no-restricted-globals
                    onChange={() => setData(event.target.value)}
                  />
                  <div className="input-group-append border-0">
                    <button
                      id="button-addon3"
                      type="button"
                      className="btn btn-link text-success"
                      onClick={toGigs}
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </Box>
          {authenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userImage} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userRole !== "Admin" && (
                  <MenuItem onClick={toProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={signout}>
                  <Typography textAlign="center">logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={login}>
                  <Typography textAlign="center">Signin</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
