import { Route, Routes } from "react-router-dom";

import { NavbarSection } from "components";

import {
  ForgetPasswordPage,
  LoginPage,
  ResetPasswordPage,
  SignupPage,
} from "pages/Auth";
import {
  AboutUsPage,
  AddBlogsPage,
  AllGigsPage,
  AllUsers,
  AppliedJobsPage,
  AppliedUserPage,
  BlogDetailPage,
  BlogsPage,
  BlogViewPage,
  BuyerOrdersPage,
  BuyerPostPage,
  BuyerResponsePage,
  CustomOfferPage,
  EditBlogsPage,
  EditJobPage,
  EditRequestsPage,
  GigPage,
  GigViewPage,
  JobPage,
  PaymentPage,
  PostJobPage,
  ProfileGigPage,
  ProfilePage,
  QueriesPage,
  RequestsPage,
  RequestsViewPage,
  ResponseRequestPage,
  SellerOrderPage,
  SendOffersPage,
  ViewJobPage,
  ViewSendRequestPage,
} from "pages/User";
import { BuyerChat, SellerChat } from "pages/User/Chat";
import Homepage from "pages/User/Homepage";

import UseAuthentication from "hooks/UseAuthenticationHook";

import { Redirect } from "utils/helpers";

function App() {
  const { authenticated, logout } = UseAuthentication();

  return authenticated ? (
    <div className=" mb-5">
      <NavbarSection logout={logout} authenticated={authenticated} />
      <Routes>
        <Route path="/user/dashboard" element={<Homepage logout={logout} />} />
        <Route path="/user/aboutUs" element={<AboutUsPage />} />
        {/* Start Buyer Routes */}
        <Route path="/user/postRequest" element={<BuyerPostPage />} />
        <Route path="/user/viewRequests" element={<RequestsViewPage />} />
        <Route path="/user/editRequests/:id" element={<EditRequestsPage />} />
        <Route path="/user/buyer-chat/:gigOwnerName" element={<BuyerChat />} />
        <Route path="/user/viewSendRequest" element={<ViewSendRequestPage />} />
        <Route path="/user/requests" element={<RequestsPage />} />
        <Route path="/user/buyerOrders" element={<BuyerOrdersPage />} />
        <Route path="/user/allgig/:id" element={<AllGigsPage />} />
        <Route path="/user/details/:id" element={<ProfileGigPage />} />
        {/* End Buyer Routes */}
        {/* Start Seller Routes */}
        <Route path="/user/BuyerResponse" element={<BuyerResponsePage />} />
        <Route path="/user/customerOffer/:id" element={<CustomOfferPage />} />
        {/* <Route path="/user/gig" element={<GigViewPage />} /> */}
        <Route path="/user/seller-chat" element={<SellerChat />} />
        <Route path="/user/gig" element={<GigViewPage />} />
        <Route path="/user/addGig" element={<GigPage />} />
        <Route path="/user/sellerOrders" element={<SellerOrderPage />} />
        <Route path="/user/payment" element={<PaymentPage />} />
        <Route
          path="/user/responseRequest/:id"
          element={<ResponseRequestPage />}
        />
        <Route path="/user/sendOffers" element={<SendOffersPage />} />
        {/* <Route path="/user/chat/:id" element={<ChatScreenPage />} /> */}
        {/* <Route path="/user/customerOffer/:id" element={<CustomOfferPage />} /> */}
        {/* <Route path="/user/responseRequest/:id" element={<ResponseRequestPage />} /> */}
        {/* End Seller Routes */}
        {/* Start Employeer Routes */}
        <Route path="/user/postjob" element={<PostJobPage />} />{" "}
        <Route path="/user/viewjob" element={<ViewJobPage />} />
        <Route path="/user/editjob/:id" element={<EditJobPage />} />
        <Route path="/user/appliedUser/:id" element={<AppliedUserPage />} />
        {/* End Employeer Routes */}
        {/* Start Admin Routes */}
        <Route path="/user/queries" element={<QueriesPage />} />
        <Route path="/user/allusers" element={<AllUsers />} />
        <Route path="/user/addBlogs" element={<AddBlogsPage />} />
        <Route path="/user/viewBlogs" element={<BlogViewPage />} />
        <Route path="/user/editblog/:id" element={<EditBlogsPage />} />
        {/* End Admin Routes */}
        {/* Start Job Seeker Routes */}
        <Route path="/user/jobs" element={<JobPage />} />
        <Route path="/user/appliedJobs" element={<AppliedJobsPage />} />
        {/* End Job Seeker Routes */}
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/details/:id" element={<BlogDetailPage />} />
        <Route path="*" element={<Redirect to="/user/dashboard" />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  ) : (
    <div className="">
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<SignupPage />} />
        <Route path="/auth/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<Redirect to="/auth/login" />} />
      </Routes>
    </div>
  );
}

export default App;
