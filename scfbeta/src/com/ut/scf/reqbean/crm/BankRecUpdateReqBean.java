package com.ut.scf.reqbean.crm;

import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.NotNull;

import com.ut.scf.reqbean.BaseReqBean;
/**
 * 
 * @author Yuancy
 *
 */
public class BankRecUpdateReqBean extends BaseReqBean{
		@NotNull(message = "企业ID不能为空") 	
		private String recId;
	 	
	    private String corpId;

	    private String accountBank;

	    private String accountName;

	    private String account;

	    private String currency;

	    private Date startDate;

	    private Date endDate;

	    private BigDecimal debitAmount;

	    private BigDecimal creditAmount;

	    private BigDecimal accountAmount;

	    private Date createTime;

	    private String createUserId;

		public String getRecId() {
			return recId;
		}

		public void setRecId(String recId) {
			this.recId = recId;
		}

		public String getCorpId() {
			return corpId;
		}

		public void setCorpId(String corpId) {
			this.corpId = corpId;
		}

		public String getAccountBank() {
			return accountBank;
		}

		public void setAccountBank(String accountBank) {
			this.accountBank = accountBank;
		}

		public String getAccountName() {
			return accountName;
		}

		public void setAccountName(String accountName) {
			this.accountName = accountName;
		}

		public String getAccount() {
			return account;
		}

		public void setAccount(String account) {
			this.account = account;
		}

		public String getCurrency() {
			return currency;
		}

		public void setCurrency(String currency) {
			this.currency = currency;
		}

		public Date getStartDate() {
			return startDate;
		}

		public void setStartDate(Date startDate) {
			this.startDate = startDate;
		}

		public Date getEndDate() {
			return endDate;
		}

		public void setEndDate(Date endDate) {
			this.endDate = endDate;
		}

		public BigDecimal getDebitAmount() {
			return debitAmount;
		}

		public void setDebitAmount(BigDecimal debitAmount) {
			this.debitAmount = debitAmount;
		}

		public BigDecimal getCreditAmount() {
			return creditAmount;
		}

		public void setCreditAmount(BigDecimal creditAmount) {
			this.creditAmount = creditAmount;
		}

		public BigDecimal getAccountAmount() {
			return accountAmount;
		}

		public void setAccountAmount(BigDecimal accountAmount) {
			this.accountAmount = accountAmount;
		}

		public Date getCreateTime() {
			return createTime;
		}

		public void setCreateTime(Date createTime) {
			this.createTime = createTime;
		}

		public String getCreateUserId() {
			return createUserId;
		}

		public void setCreateUserId(String createUserId) {
			this.createUserId = createUserId;
		}

}
