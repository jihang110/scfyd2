package com.ut.scf.pojo.auto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UploadFilePathExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public UploadFilePathExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andPathIdIsNull() {
            addCriterion("PATH_ID is null");
            return (Criteria) this;
        }

        public Criteria andPathIdIsNotNull() {
            addCriterion("PATH_ID is not null");
            return (Criteria) this;
        }

        public Criteria andPathIdEqualTo(Integer value) {
            addCriterion("PATH_ID =", value, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdNotEqualTo(Integer value) {
            addCriterion("PATH_ID <>", value, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdGreaterThan(Integer value) {
            addCriterion("PATH_ID >", value, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("PATH_ID >=", value, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdLessThan(Integer value) {
            addCriterion("PATH_ID <", value, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdLessThanOrEqualTo(Integer value) {
            addCriterion("PATH_ID <=", value, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdIn(List<Integer> values) {
            addCriterion("PATH_ID in", values, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdNotIn(List<Integer> values) {
            addCriterion("PATH_ID not in", values, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdBetween(Integer value1, Integer value2) {
            addCriterion("PATH_ID between", value1, value2, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathIdNotBetween(Integer value1, Integer value2) {
            addCriterion("PATH_ID not between", value1, value2, "pathId");
            return (Criteria) this;
        }

        public Criteria andPathRuleIsNull() {
            addCriterion("PATH_RULE is null");
            return (Criteria) this;
        }

        public Criteria andPathRuleIsNotNull() {
            addCriterion("PATH_RULE is not null");
            return (Criteria) this;
        }

        public Criteria andPathRuleEqualTo(String value) {
            addCriterion("PATH_RULE =", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleNotEqualTo(String value) {
            addCriterion("PATH_RULE <>", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleGreaterThan(String value) {
            addCriterion("PATH_RULE >", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleGreaterThanOrEqualTo(String value) {
            addCriterion("PATH_RULE >=", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleLessThan(String value) {
            addCriterion("PATH_RULE <", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleLessThanOrEqualTo(String value) {
            addCriterion("PATH_RULE <=", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleLike(String value) {
            addCriterion("PATH_RULE like", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleNotLike(String value) {
            addCriterion("PATH_RULE not like", value, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleIn(List<String> values) {
            addCriterion("PATH_RULE in", values, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleNotIn(List<String> values) {
            addCriterion("PATH_RULE not in", values, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleBetween(String value1, String value2) {
            addCriterion("PATH_RULE between", value1, value2, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathRuleNotBetween(String value1, String value2) {
            addCriterion("PATH_RULE not between", value1, value2, "pathRule");
            return (Criteria) this;
        }

        public Criteria andPathNameIsNull() {
            addCriterion("PATH_NAME is null");
            return (Criteria) this;
        }

        public Criteria andPathNameIsNotNull() {
            addCriterion("PATH_NAME is not null");
            return (Criteria) this;
        }

        public Criteria andPathNameEqualTo(String value) {
            addCriterion("PATH_NAME =", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameNotEqualTo(String value) {
            addCriterion("PATH_NAME <>", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameGreaterThan(String value) {
            addCriterion("PATH_NAME >", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameGreaterThanOrEqualTo(String value) {
            addCriterion("PATH_NAME >=", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameLessThan(String value) {
            addCriterion("PATH_NAME <", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameLessThanOrEqualTo(String value) {
            addCriterion("PATH_NAME <=", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameLike(String value) {
            addCriterion("PATH_NAME like", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameNotLike(String value) {
            addCriterion("PATH_NAME not like", value, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameIn(List<String> values) {
            addCriterion("PATH_NAME in", values, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameNotIn(List<String> values) {
            addCriterion("PATH_NAME not in", values, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameBetween(String value1, String value2) {
            addCriterion("PATH_NAME between", value1, value2, "pathName");
            return (Criteria) this;
        }

        public Criteria andPathNameNotBetween(String value1, String value2) {
            addCriterion("PATH_NAME not between", value1, value2, "pathName");
            return (Criteria) this;
        }

        public Criteria andNoteIsNull() {
            addCriterion("NOTE is null");
            return (Criteria) this;
        }

        public Criteria andNoteIsNotNull() {
            addCriterion("NOTE is not null");
            return (Criteria) this;
        }

        public Criteria andNoteEqualTo(String value) {
            addCriterion("NOTE =", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotEqualTo(String value) {
            addCriterion("NOTE <>", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteGreaterThan(String value) {
            addCriterion("NOTE >", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteGreaterThanOrEqualTo(String value) {
            addCriterion("NOTE >=", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteLessThan(String value) {
            addCriterion("NOTE <", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteLessThanOrEqualTo(String value) {
            addCriterion("NOTE <=", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteLike(String value) {
            addCriterion("NOTE like", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotLike(String value) {
            addCriterion("NOTE not like", value, "note");
            return (Criteria) this;
        }

        public Criteria andNoteIn(List<String> values) {
            addCriterion("NOTE in", values, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotIn(List<String> values) {
            addCriterion("NOTE not in", values, "note");
            return (Criteria) this;
        }

        public Criteria andNoteBetween(String value1, String value2) {
            addCriterion("NOTE between", value1, value2, "note");
            return (Criteria) this;
        }

        public Criteria andNoteNotBetween(String value1, String value2) {
            addCriterion("NOTE not between", value1, value2, "note");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("CREATE_TIME is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("CREATE_TIME is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("CREATE_TIME =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("CREATE_TIME <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("CREATE_TIME >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("CREATE_TIME >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("CREATE_TIME <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("CREATE_TIME <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("CREATE_TIME in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("CREATE_TIME not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("CREATE_TIME between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("CREATE_TIME not between", value1, value2, "createTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}