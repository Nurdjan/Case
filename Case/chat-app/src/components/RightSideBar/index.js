import React from "react";
import Style from "./style.module.scss";
import logoImage from "../../../public/SSTTEK_DARK_Logo.svg";
import Image from "next/image";
import { Delete } from "../elements/icons";
import Link from "next/link";
import Button from "../elements/Button";

const RightSideBar = () => {
  return (
    <div className={Style.RightSideBar}>
      <div className={Style.logoSite}>
        <Image src={logoImage} width={177} height={40} alt="Logo Image" />
        <span className={Style.site}>www.ssttek.com</span>
      </div>
      <div className={Style.ContactInfos}>
        <div className={Style.ContactInfo}>
          <span className={Style.title}>Email</span>
          <p className={Style.text}>ssttech@example.com</p>
        </div>
        <div className={Style.ContactInfo}>
          <span className={Style.label}>Phone</span>
          <p className={Style.text}>+04 - 123456789</p>
        </div>
      </div>
      <div className={Style.labels}>
        <p className={Style.labelsTitle}>Labels</p>
        <div className={Style.labelsList}>
          <div className={Style.label}>
            <span>Bot</span>
            <Delete />
          </div>
          <div className={Style.label}>
            <span>React</span>
            <Delete />
          </div>
        </div>
      </div>
      <div className={Style.attachments}>
        <p className={Style.attachmentsTitle}>Attachments</p>
        <div className={Style.attachmentsList}>
          <div className={Style.attachment}>Dataset.csv</div>
          <div className={Style.attachment}>bot_face.jpg</div>
        </div>
        <Link href="/" className={Style.link}>
          View All
        </Link>
      </div>
      <div className={Style.action}>
        <Button buttonName="React" type="primary" />
      </div>
    </div>
  );
};

export default RightSideBar;
