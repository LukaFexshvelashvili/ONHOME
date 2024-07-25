import { useDispatch, useSelector } from "react-redux";
import EstateConfirm from "./components/EstateConfirm";
import {
  EstateAddons,
  EstateClosePlaces,
  EstateImages,
  EstateInformation,
  EstateType,
} from "./components/Selectors";
import { RootState } from "../../store/store";
import { useEffect, useLayoutEffect, useState } from "react";
import ContentLoader from "../../components/global/ContentLoader";
import { useNavigate } from "react-router-dom";
import { updateLandSize, updateStatus } from "../../store/data/addProductSlice";
import {
  DealType,
  EstateAddress,
  EstateDescription,
  EstateOption,
  EstateStatus,
  EstateTitle,
} from "./components/SelectorsOpt";
import UploadStatusBlock from "./components/UploadStatusBlock";
import { Helmet } from "react-helmet";
import { t } from "i18next";

export default function AddProduct() {
  const productData = useSelector((store: RootState) => store.addProduct);
  const userData = useSelector((store: RootState) => store.user);
  const [showError, setShowError] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<number | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertBlock, setAlertBlock] = useState<boolean>(false);
  useLayoutEffect(() => {
    if (userData.isLogged !== null && userData.isLogged === false) {
      navigate("/Login");
    }
  }, []);
  useEffect(() => {
    if (productData.estateType == 3) {
      dispatch(updateStatus(null));
      dispatch(updateLandSize(null));
    }
  }, [productData.estateType]);

  return (
    <>
      <Helmet>
        <title>{t("addProduct.title")} - Onhome.ge</title>
      </Helmet>
      <main className="flex flex-row-reverse gap-3 min-h-screen items-start smallXl:flex-col">
        {alertBlock && (
          <div className="fixed w-full h-full top-0 left-0 z-50 flex justify-center items-center bg-blackFade">
            <div className=" w-[650px] h-auto min-h-[150px] rounded-section bg-whiteMain p-5 relative z-10">
              {uploadStatus === null ? (
                <ContentLoader />
              ) : (
                <UploadStatusBlock
                  status={uploadStatus}
                  setStatus={setUploadStatus}
                  setAlertBlock={setAlertBlock}
                />
              )}
            </div>
          </div>
        )}
        <section className="flex-[3] medium:w-8/12 bg-whiteMain rounded-section shadow-sectionShadow smallXl:w-full">
          <div className="py-4 px-5 flex flex-col gap-8  mobile:px-3">
            <EstateType />
            {productData.estateType !== null && <DealType />}
            {productData.estateDeal !== null && (
              <EstateStatus productData={productData} />
            )}

            {productData.estateStatus !== null && (
              <EstateTitle
                error={
                  showError && productData.estateTitle == null ? true : false
                }
              />
            )}
            {productData.estateStatus !== null && <EstateDescription />}
            {productData.estateStatus !== null && (
              <EstateAddress
                error={
                  showError && productData.estateCity == null ? true : false
                }
              />
            )}
            {productData.estateStatus !== null && (
              <EstateImages
                error={
                  showError && productData.estateImages == null ? true : false
                }
              />
            )}
            {productData.estateStatus !== null && (
              <EstateInformation
                productData={productData}
                error={
                  showError && productData.estatePrice == null ? true : false
                }
              />
            )}
            {productData.estateStatus !== null && (
              <EstateAddons productData={productData} />
            )}
            {productData.estateStatus !== null && <EstateClosePlaces />}
            {productData.estateStatus !== null && <EstateOption />}
          </div>
        </section>
        <section className="flex-1 medium:w-4/12 sticky top-[80px] bg-whiteMain rounded-section shadow-sectionShadow smallXl:w-full">
          <EstateConfirm
            setAlertBlock={setAlertBlock}
            setShowError={setShowError}
            setUploadStatus={setUploadStatus}
          />
        </section>
      </main>
    </>
  );
}
