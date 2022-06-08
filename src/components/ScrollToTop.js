import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScrollToTop() {
  // 페이지 이동 시 스크롤 맨 위부터 보여주기
  const { pathname } = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
